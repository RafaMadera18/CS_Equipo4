namespace MrHotel.ApiService.RoomPropertyGroups.Validation;

using FluentValidation;

using MrHotel.ApiService.RoomPropertyGroups.Data;

public sealed class RoomPropertyUpdateDataValidator : AbstractValidator<RoomPropertyUpdateData>
{
    private RoomPropertyUpdateDataValidator()
    {
        this.RuleFor(update => update.Id)
            .NotEqual(Guid.Empty);

        this.RuleFor(update => update.Name)
            .NotEmpty();
    }

    public static RoomPropertyUpdateDataValidator Instance { get; } = new();
}
