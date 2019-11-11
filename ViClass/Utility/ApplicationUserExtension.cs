using System.Net.Mail;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using ViClass.Controllers.Resources;
using ViClass.Models;

namespace ViClass.Utility
{
    public static class ApplicationUserExtension
    {
        public static string ModifyChangeIfItsValid(this ApplicationUser storageUser, ApplicationUserResource inputUser)
        {
            if (inputUser.Email != null)
            {
                try
                {
                    var possibleEmail = new MailAddress(inputUser.Email);
                    storageUser.Email          = inputUser.Email;
                    storageUser.EmailConfirmed = false;
                }
                catch
                {
                    return "Email format is not valid.";
                }
            }
            else if (inputUser.NameAndFamily != null)
            {
                var regex = new Regex("[آ-ی, ]{1,31}");
                if (regex.IsMatch(inputUser.NameAndFamily))
                    storageUser.NameAndFamily = inputUser.NameAndFamily;
                else
                    return "NameAndFamily format is not valid.";
            }
            else if (inputUser.StudentNumber != null)
            {
                var regex = new Regex("[0-9]{10}");
                if (regex.IsMatch(inputUser.StudentNumber))
                {
                    storageUser.StudentNumber          = inputUser.StudentNumber;
                    storageUser.StudentNumberConfirmed = false;
                }
                else
                    return "StudentNumber format is not valid.";
            }
            else if (inputUser.PhoneNumber != null)
            {
                var regex = new Regex("^09[0-9]{9}");
                if (regex.IsMatch(inputUser.PhoneNumber))
                {
                    storageUser.PhoneNumber          = inputUser.PhoneNumber;
                    storageUser.PhoneNumberConfirmed = false;
                }
                else
                    return "PhoneNumber format is not valid.";
            }

            return null;
        }
    }
}