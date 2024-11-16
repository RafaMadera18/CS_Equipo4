namespace MrHotel.ApiService.Rooms.Validation;

using System.Diagnostics.Contracts;

using FluentValidation;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities.Rooms;

public sealed class RoomAddingValidator : AbstractValidator<RoomInfo>
{
    public RoomAddingValidator(IQueryable<RoomInfo> rooms)
    {
        this.RuleLevelCascadeMode = CascadeMode.Stop;

        this.RuleFor(room => room.Id)
            .Equal(Guid.Empty);

        this.RuleFor(room => room.Name)
            .NotNull()
            .MustAsync((name, _) => IsUniqueName(rooms, name)).WithMessage("'Name' must be unique.");
    }

    [Pure]
    private static Task<bool> IsUniqueName(IQueryable<RoomInfo> rooms, string name)
    {
        return rooms.AllAsync(group => group.Name != name);
    }
}
