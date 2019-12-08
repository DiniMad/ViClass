using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ViClass.Data;
using ViClass.Hubs.Resources;

namespace ViClass.Hubs
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext         _dbContext;
        private static   IList<ClientResourceToStore> ClientsList { get; } = new List<ClientResourceToStore>();


        public ChatHub(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Subscribe(string classId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, classId);
            var userId = Context.User.Claims.First(c => c.Type == "sub").Value;
            var user   = _dbContext.Users.SingleOrDefault(u => u.Id == userId);
            if (user is null) return;
            var userName = user.NameAndFamily ?? user.Email;
            var client = new ClientResourceToStore
                {UserId = userId, UserName = userName, ClassId = classId, ConnectionId = Context.ConnectionId};
            ClientsList.Add(client);
            await Clients.GroupExcept(classId, Context.ConnectionId)
                         .SendAsync("OnSubscribe", client as ClientResource);
            await Clients.Caller.SendAsync("OnSubscribe", ClientsList.Select(c => c as ClientResource));
        }

        public async Task Unsubscribe()
        {
            await RemoveUserOnDisconnect();
        }


        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await RemoveUserOnDisconnect();
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string classId, string text)
        {
            var userId = Context.User.Claims.First(c => c.Type == "sub").Value;
            var user   = await _dbContext.Users.FindAsync(userId);

            var chatMessage = new ChatMessageResource
            {
                UserId  = userId,
                User    = user.NameAndFamily ?? user.Email,
                Text    = text
            };
            await Clients.Group(classId).SendAsync("OnReceiveMessage", chatMessage);
        }

        private async Task RemoveUserOnDisconnect()
        {
            var userId = Context.User.Claims.First(c => c.Type == "sub").Value;
            var clients = ClientsList.Where(cl => cl.UserId == userId && cl.ConnectionId == Context.ConnectionId)
                                     .ToList();
            if (clients.Count == 0) return;
            foreach (var client in clients)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, client.ClassId);
                ClientsList.Remove(client);
                await Clients.Group(client.ClassId).SendAsync("OnUnsubscribe", userId);
            }
        }
        
    }
}