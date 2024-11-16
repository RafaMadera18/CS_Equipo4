namespace MrHotel.ApiService.RoomPropertyGroups.Validation;

using FluentValidation;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities.Rooms;

public sealed class RoomPropertyGroupAddingValidator : AbstractValidator<RoomPropertyGroup>
{
    public RoomPropertyGroupAddingValidator(IQueryable<RoomPropertyGroup> groups)
    {
        this.RuleLevelCascadeMode = CascadeMode.Stop;

        this.RuleFor(group => group.Name)
            .NotEmpty()
            .MustAsync((name, _) => IsUniqueName(groups, name)).WithMessage("'Name' must be unique.");
    }

    private static Task<bool> IsUniqueName(IQueryable<RoomPropertyGroup> groups, string name)
    {
        return groups.AllAsync(group => group.Name != name);
    }
}
