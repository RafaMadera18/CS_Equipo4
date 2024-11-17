namespace MrHotel.ApiService.Guests.Validation;

using FluentValidation;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities.Guests;

public sealed class GuestAddingValidator : AbstractValidator<GuestInfo>
{
    private GuestAddingValidator()
    {
        this.RuleLevelCascadeMode = CascadeMode.Stop;

        this.RuleFor(guest => guest.Id)
            .Equal(Guid.Empty);

        this.RuleFor(guest => guest.FullName)
            .NotNull();

        this.RuleFor(guest => guest.PhoneNumber)
            .NotNull()
            .Length(3, 15);

        this.RuleFor(guest => guest.DateOfBirth)
            .LessThan(_ => DateOnly.FromDateTime(DateTime.UtcNow))
            .WithMessage("The 'Date Of Birth' cannot be in the future.");
    }

    public static GuestAddingValidator Instance { get; } = new();
}
