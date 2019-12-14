using System;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using ViClass.Controllers.Resources;
using ViClass.Data;
using ViClass.Models;

namespace ViClass.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly ApplicationDbContext           _context;
        private readonly UserManager<ApplicationUser>   _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender                   _emailSender;

        public AuthenticationController(ApplicationDbContext           context,
                                        UserManager<ApplicationUser>   userManager,
                                        SignInManager<ApplicationUser> signInManager,
                                        IEmailSender                   emailSender)
        {
            _context       = context;
            _userManager   = userManager;
            _signInManager = signInManager;
            _emailSender   = emailSender;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginResource loginResource)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.StudentNumber == loginResource.StudentNumber);
            if (user is null) return BadRequest(Guid.NewGuid());

            if (await _userManager.CheckPasswordAsync(user, loginResource.Password))
                await _signInManager.SignInAsync(user, loginResource.RememberMe);
            else
                return BadRequest(Guid.NewGuid());

            return Ok(Guid.NewGuid());
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            if (!ModelState.IsValid) return BadRequest(Guid.NewGuid().ToString());

            var userExist = await _context.Users
                                          .SingleOrDefaultAsync(u =>
                                                                    u.StudentNumber == registerModel.StudentNumber ||
                                                                    u.Email         == registerModel.Email);
            if (userExist != null)
                return BadRequest(new
                {
                    errors = new
                    {
                        StudentNumberTaken = userExist.StudentNumber == registerModel.StudentNumber,
                        EmailTaken         = userExist.Email         == registerModel.Email
                    },
                    guid = Guid.NewGuid()
                });
            
            var user = new ApplicationUser
            {
                UserName      = registerModel.Email,
                Email         = registerModel.Email,
                StudentNumber = registerModel.StudentNumber
            };
            
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded) return Problem(Guid.NewGuid().ToString());

            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var callbackUrl = Url.Page("/Account/ConfirmEmail",
                                       pageHandler: null,
                                       values: new {area = "Identity", userId = user.Id, code = code},
                                       protocol: Request.Scheme);

            await _emailSender.SendEmailAsync(registerModel.Email,
                                              "Confirm your email",
                                              $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(Guid.NewGuid());
        }
    }
}