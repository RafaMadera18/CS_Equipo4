namespace MrHotel.ApiService.Core.Validation;

public sealed record ValidationError(
    string Name,
    string Description);
