namespace MrHotel.Identity.Services;

using Microsoft.Extensions.Configuration;

using MrHotel.Shared.Extensions.Configuration;

public class AdminCodeValidator(IConfiguration configuration)
{
    public bool IsValid(string code)
    {
        return configuration.GetRequired("AdminCode") == code;
    }
}
