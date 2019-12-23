using System;

namespace ViClass.Controllers.Resources
{
    public class ApiResponseResource
    {
        private int    StatusCode { get; set; }
        private string Message    { get; set; }
        private Guid   Guid       { get; set; }

        public static ApiResponseResource Success(string message, int statusCode = 200)
        {
            return new ApiResponseResource
            {
                StatusCode = statusCode,
                Message    = message,
                Guid       = Guid.NewGuid(),
            };
        }

        public static ApiResponseResource Fail(string message, int statusCode = 400)
        {
            return new ApiResponseResource
            {
                StatusCode = statusCode,
                Message    = message,
                Guid       = Guid.NewGuid()
            };
        }
    }
}