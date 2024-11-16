namespace MrHotel.ApiService.RoomPropertyGroups.Validation;

using FluentValidation;

using MrHotel.ApiService.Core.Validation;
using MrHotel.ApiService.RoomPropertyGroups.Data;

public sealed class RoomPropertyGroupUpdateDataValidator : AbstractValidator<RoomPropertyGroupUpdateData>
{
    private RoomPropertyGroupUpdateDataValidator()
    {
        this.RuleLevelCascadeMode = CascadeMode.Stop;

        this.RuleFor(group => group.Name)
            .NotEmpty();

        this.RuleFor(group => group.PropertiesUpdates)
            .NotNull()
            .ForEach(update => update.SetValidator(RoomPropertyUpdateDataValidator.Instance))
            .Unique(update => update.Name);
    }

    public static RoomPropertyGroupUpdateDataValidator Instance { get; } = new();
}
