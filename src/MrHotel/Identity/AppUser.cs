namespace MrHotel.Identity;

using Microsoft.AspNetCore.Identity;

public class AppUser : IdentityUser
{
    public UserRole Role { get; set; }
}
