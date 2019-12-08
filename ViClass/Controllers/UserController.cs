using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViClass.Controllers.Resources;
using ViClass.Data;
using ViClass.Models;
using ViClass.Utility;

namespace ViClass.Controllers
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper              _mapper;

        public UserController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper  = mapper;
        }

        // GET: api/User/5
        [HttpGet("{id?}")]
        public async Task<ActionResult<ApplicationUserResource>> GetUser(string id)
        {
            if (id is null) id = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return _mapper.Map<ApplicationUser, ApplicationUserResource>(user);
        }

        // PUT: api/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClass(string id, ApplicationUserResource inputUser)
        {
            var requestUserId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            if (id != requestUserId) return BadRequest();

            var storageUser = await _context.Users.FindAsync(id);

            var validationError = storageUser.ModifyChangeIfItsValid(inputUser);
            if (!string.IsNullOrWhiteSpace(validationError)) return BadRequest(validationError);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException innerException &&
                    (innerException.Number == 2627 || innerException.Number == 2601))
                    return StatusCode(403, "Already taken.");
                return StatusCode(500, "Something went wrong.");
            }

            return Ok(Guid.NewGuid());
        }
    }
}