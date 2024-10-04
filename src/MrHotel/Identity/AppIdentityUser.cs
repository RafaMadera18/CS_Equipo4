namespace MrHotel.Identity;

using Microsoft.AspNetCore.Identity;

public abstract class AppIdentityUser : IdentityUser
{
    public UserRole Role { get; set; }

    public new string UserName
    {
        get => base.UserName
            ?? throw new InvalidOperationException("The username field was expected to have a value.");
        set => base.UserName = value;
    }
}
