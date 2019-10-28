using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViClass.Utility;

namespace ViClass.Controllers
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    [Route("api/[controller]")]
    public class DateController : Controller
    {
        [HttpGet("[action]")]
        public string Current()
        {
            return PersianDate.GetPersianDateFormatted(true);
        }
    }
}