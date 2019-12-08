namespace ViClass.Hubs.Resources
{
    public class ClientResource
    {
        public string UserId   { get; set; }
        public string UserName { get; set; }
    }

    public class ClientResourceToStore : ClientResource
    {
        public string ClassId      { get; set; }
        public string ConnectionId { get; set; }
    }
}