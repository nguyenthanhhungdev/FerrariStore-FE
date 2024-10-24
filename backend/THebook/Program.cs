using System.Text.Json.Serialization;
using AutoWrapper;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using THebook.Repository;
using THebook.Services;

var builder = WebApplication.CreateBuilder(args);

// Enable HTTP logging

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.RequestMethod | HttpLoggingFields.RequestPath;
});

// Add MongoDB

// Set up MongoDB conventions
var pack = new ConventionPack { new EnumRepresentationConvention(BsonType.String) };

ConventionRegistry.Register("EnumStringConvention", pack, t => true);

// Lấy thông tin cấu hình từ tệp appsettings.json và đăng ký các dịch vụ cần thiết cho Dependency Injection.
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<IMongoDBSettings>(sp =>
    sp.GetRequiredService<IOptions<MongoDBSettings>>().Value
);
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddSingleton<BookService>();

// Add services to the container.

builder.Services.AddLogging(); // Thêm dòng này để cấu hình logging

builder
    .Services.AddControllers()
    // set global enum serialization
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpLogging();

//Register the middleware below within the Configure() method of Startup.cs "before" the UseRouting() middleware:
app.UseApiResponseAndExceptionWrapper();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
