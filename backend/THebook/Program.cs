using Microsoft.Extensions.Options;
using THebook.ExceptionError;
using THebook.Middleware;
using Microsoft.AspNetCore.HttpLogging;
using THebook.Repository;
using THebook.Services;

var builder = WebApplication.CreateBuilder(args);

// Enable HTTP logging

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.RequestMethod | HttpLoggingFields.RequestPath;
});

// Add MongoDB


// Lấy thông tin cấu hình từ tệp appsettings.json và đăng ký các dịch vụ cần thiết cho Dependency Injection.
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<IMongoDBSettings>(sp =>
    sp.GetRequiredService<IOptions<MongoDBSettings>>().Value);
builder.Services.AddSingleton<MongoDBService>();
builder.Services.AddSingleton<BookService>();

// Add services to the container.

builder.Services.AddLogging(); // Thêm dòng này để cấu hình logging

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();
app.UseExceptionHandler();

app.UseHttpLogging();

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
