using System.Net;
using System.Text.Json;
using NotesAPI.Exceptions;

namespace NotesAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, IWebHostEnvironment env)
        {
            _next = next;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            // Map exceptions to their respective HTTP status code.
            int statusCode = exception switch
            {
                NotFoundException => (int)HttpStatusCode.NotFound,
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
                ArgumentException => (int)HttpStatusCode.BadRequest,
                _ => (int)HttpStatusCode.InternalServerError
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            // Ensure CORS headers are present on error responses.
            if (!context.Response.Headers.ContainsKey("Access-Control-Allow-Origin"))
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
            }

            // Create an error response payload. In Development mode provide more details.
            var errorResponse = new
            {
                error = exception.Message,
                details = _env.IsDevelopment() ? exception.StackTrace : null
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            string jsonResponse = JsonSerializer.Serialize(errorResponse, options);

            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
