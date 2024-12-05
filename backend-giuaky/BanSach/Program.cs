using System.Text.Json.Serialization;
using AutoWrapper;
using BanSach.Infrastructure;
using BanSach.Model;
using BanSach.Repository;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using MongoDB.Infrastructure;
using MongoDB.Infrastructure.Extensions;
using MongoDB.Repository;
using MongoDB.UnitOfWork.Abstractions.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Enable HTTP logging
builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields =
        HttpLoggingFields.RequestMethod
        | HttpLoggingFields.RequestPath
        | HttpLoggingFields.ResponseStatusCode;
    logging.CombineLogs = true;
});

// Add MongoDB auto enum conversion to string
var pack = new ConventionPack { new EnumRepresentationConvention(BsonType.String) };
ConventionRegistry.Register("EnumStringConvention", pack, t => true);

// Lấy thông tin cấu hình từ tệp appsettings.json và đăng ký các dịch vụ cần thiết cho Dependency Injection.
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<IMongoDbSettings>(sp =>
    sp.GetRequiredService<IOptions<MongoDbSettings>>().Value
);

// Add services to the container.

// Thêm dòng này để cấu hình logging
builder.Services.AddLogging();

builder
    .Services.AddControllers(options =>
    {
        // options.Filters.Add<GlobalExceptionFilter>();
    })
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

var databaseName = builder.Configuration.GetSection("MongoDB:DatabaseName")?.Get<string>();
var connectionString = builder.Configuration.GetSection("MongoDB:ConnectionString")?.Get<string>();
var databaseSettings = builder
    .Configuration.GetSection("MongoDB:DatabaseSettings")
    ?.Get<MongoDatabaseSettings>();
var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
clientSettings.LoggingSettings = new LoggingSettings(
    LoggerFactory.Create(loggingBuilder =>
        loggingBuilder.AddConfiguration(builder.Configuration.GetSection("Logging")).AddConsole()
    ),
    builder.Configuration.GetSection("MongoDB:LoggingMaxDocumentSize").Get<int>()
);
var collectionNames = builder
    .Configuration.GetSection("MongoDB:CollectionNames")
    ?.Get<IDictionary<string, string>>()!;

// Register the DbContext
builder.Services.AddMongoDbContext<IMongoDbContext, BanSachContext>(
    clientSettings,
    databaseName,
    databaseSettings,
    fluentConfigurationOptions: new MongoDbFluentConfigurationOptions
    {
        ScanningAssemblies = [typeof(BanSachContext).Assembly],
    }
);

// Register the UnitOfWork
builder.Services.AddMongoDbUnitOfWork<BanSachContext>();

// https://github.com/ffernandolima/mongo-db-data-access/issues/16
// them options vao DI de trong Repository co the lay duoc collection name
builder.Services.AddSingleton<IMongoDbRepositoryOptions<Genre>>(
    provider => new MongoDbRepositoryOptions<Genre>
    {
        CollectionName = provider
            .GetRequiredService<IOptions<MongoDbSettings>>()
            .Value.CollectionNames[nameof(Genre)],
    }
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpLogging();

app.UseApiResponseAndExceptionWrapper<ApiResponseAutoWrapperMapObject>(
    new AutoWrapperOptions { UseApiProblemDetailsException = true }
);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
