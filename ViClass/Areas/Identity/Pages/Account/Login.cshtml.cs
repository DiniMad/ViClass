using System.Globalization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using ViClass.Models;

namespace ViClass.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        private readonly UserManager<ApplicationUser>   _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<LoginModel>            _logger;
        private readonly IEmailSender                   _emailSender;

        public LoginModel(SignInManager<ApplicationUser> signInManager,
                          ILogger<LoginModel>            logger,
                          UserManager<ApplicationUser>   userManager,
                          IEmailSender                   emailSender)
        {
            _userManager   = userManager;
            _signInManager = signInManager;
            _emailSender   = emailSender;
            _logger        = logger;
        }

        [BindProperty] public InputModel Input { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public string ReturnUrl { get; set; }

        [TempData] public string ErrorMessage { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "شماره دانشجویی را وارد کنید.")]
            [Display(Name          = "شماره دانشجویی")]
            [Range(typeof(ulong), "9000000000", "9999999999", ErrorMessage =
                "شماره دانشجویی یک عدد بدون علامت 10 رقمی است.")]
            public ulong StudentNumber { get; set; }

            [Display(Name          = "رمز عبور")]
            [Required(ErrorMessage = "رمز عبور را وارد کنید.")]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "مرا به خاطر نگه دار")]
            public bool RememberMe { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }

            returnUrl = returnUrl ?? Url.Content("~/");

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            if (ModelState.IsValid)
            {
                var user = _userManager.Users.FirstOrDefault(u => u.StudentNumber == Input.StudentNumber.ToString());
                if (!(user is null) && await _userManager.CheckPasswordAsync(user, Input.Password))
                    await _signInManager.SignInAsync(user, Input.RememberMe);
                return Redirect(returnUrl);
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }

        public async Task<IActionResult> OnPostSendVerificationEmailAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var user = await _userManager.FindByEmailAsync("");
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Verification email sent. Please check your email.");
            }

            var userId = await _userManager.GetUserIdAsync(user);
            var code   = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.Page(
                                       "/Account/ConfirmEmail",
                                       pageHandler: null,
                                       values: new {userId = userId, code = code},
                                       protocol: Request.Scheme);
            await _emailSender.SendEmailAsync(
                                              "",
                                              "Confirm your email",
                                              $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            ModelState.AddModelError(string.Empty, "Verification email sent. Please check your email.");
            return Page();
        }
    }
}