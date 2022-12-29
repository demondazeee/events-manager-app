using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebAPI.DBContext;
using WebAPI.Entities;
using WebAPI.Services;
using static WebAPI.Entities.Users;
using Serilog;

var builder = WebApplication.CreateBuilder(args);



Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

// Add services to the container.

builder.Services.AddAuthorization(opt => {
    opt.AddPolicy("SomeShit", policy=> {
        policy.RequireAuthenticatedUser()
        .RequireRole("Admin");
    });
});


builder.Services.AddControllers(
    opt => opt.ReturnHttpNotAcceptable = true
)
.AddNewtonsoftJson(
    opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
)
.AddXmlDataContractSerializerFormatters();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Db>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IEventsRepository, EventsRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());



var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(opt => {
    opt.AddPolicy(name: MyAllowSpecificOrigins, policy => {
            policy.WithOrigins("http://localhost:3000")
            .WithExposedHeaders("X-Pagination")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
    }
);

builder.Services.AddAuthentication()
.AddJwtBearer(
    opt => {
        opt.TokenValidationParameters = new () {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Authentication:Issuer"],
            ValidAudience = builder.Configuration["Authentication:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(builder.Configuration["Authentication:SecretForKey"]!)
            )
        };
    }
);

builder.Services.AddAuthorization(
    opt => opt.AddPolicy("SomePolicy", policy => {
      policy.RequireAuthenticatedUser()
      .RequireRole(UserRole.Admin.ToString(), UserRole.Manager.ToString(), UserRole.Member.ToString());
    })
);

builder.Host.UseSerilog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


