using System.Text.Json.Serialization;
using AutoWrapper;
using FluentValidation;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using THebook.Common;
using THebook.Models.Queries;
using THebook.Repository;
using THebook.Services;

var builder = WebApplication.CreateBuilder(args);

// Enable HTTP logging
builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields =
        HttpLoggingFields.RequestMethod
        | HttpLoggingFields.RequestPath
        | HttpLoggingFields.ResponseStatusCode
        | HttpLoggingFields.Duration;
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

builder.Services.AddDbContext<MongoDbContext>();

builder.Services.AddSingleton<MongoDbCollection>();
builder.Services.AddScoped(typeof(ICrudRepository<>), typeof(CrudRepository<>));
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<TagService>(); // Change from AddSingleton to AddScoped

// Thêm dòng này để cấu hình logging
builder.Services.AddLogging();

builder
    .Services.AddControllers(options =>
    {
        options.Filters.Add<GlobalExceptionFilter>();
    })
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// FluentValidation can be used within ASP.NET Core web applications to validate incoming models
builder.Services.AddScoped<IValidator<QueryObjectId>, QueryObjectIdValidator>();
builder.Services.AddScoped<IValidator<TagCriteria>, TagCriteriaValidator>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowSpecificOrigin",
//         corsPolicyBuilder => corsPolicyBuilder.WithOrigins("http://localhost:5173") // Replace with your frontend URL
//             .AllowAnyMethod()
//             .AllowAnyHeader()
//             .AllowCredentials());
// });

var app = builder.Build();

app.UseHttpLogging();

app.UseApiResponseAndExceptionWrapper<ApiResponseAutoWrapperMapObject>(
    new AutoWrapperOptions { UseApiProblemDetailsException = true }
);

// // Use the CORS policy
// app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
