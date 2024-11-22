namespace MrHotel.Database.Entities.Reservations;

using System.Text.Json.Serialization;

public partial class ReservationInfo
{
    [JsonIgnore]
    public Guid GuestId { get; set; }

    [JsonIgnore]
    public Guid RoomId { get; set; }
}
