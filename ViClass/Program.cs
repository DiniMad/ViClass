using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ViClass
{
    public class Program
    {
        private static string CurrentDirectory { get; } = Directory.GetCurrentDirectory();

        public static void Main(string[] args)
        {
            CreateReacquiredDirectories();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) => WebHost.CreateDefaultBuilder(args)
                                                                                    .UseStartup<Startup>();

        private static void CreateReacquiredDirectories()
        {
            var classSharedFilesPath = Path.Combine(CurrentDirectory, "wwwroot", "Class Shared Files");
            var classVideosPath      = Path.Combine(CurrentDirectory, "wwwroot", "Class Videos");
            var profileImagePath     = Path.Combine(CurrentDirectory, "wwwroot", "Profile Images");
            if (!Directory.Exists(classSharedFilesPath)) Directory.CreateDirectory(classSharedFilesPath);
            if (!Directory.Exists(classVideosPath)) Directory.CreateDirectory(classVideosPath);
            if (!Directory.Exists(profileImagePath)) Directory.CreateDirectory(profileImagePath);
        }
    }
}