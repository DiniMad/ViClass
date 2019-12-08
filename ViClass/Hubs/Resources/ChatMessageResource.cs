using System;

namespace ViClass.Hubs.Resources
{
    public class ChatMessageResource
    {
        public ChatMessageResource()
        {
            Time = DateTime.Now.ToLocalTime().ToString("HH:mm");
            Id   = Guid.NewGuid().ToString();
        }

        public string Id      { get; }
        public string UserId  { get; set; }
        public string User    { get; set; }
        public string Text    { get; set; }
        public string Time    { get; }
    }
}