namespace MrHotel.Identity;

using Microsoft.AspNetCore.Identity;

// TODO: Rename to AppIdentityUser, and create new AppUser in MrHotel.Database
public class AppUser : IdentityUser
{
    public UserRole Role { get; set; }

    public new string UserName
    {
        get => base.UserName
            ?? throw new InvalidOperationException("The username field was expected to have a value.");
        set => base.UserName = value;
    }
}
