namespace MrHotel.ApiService.Core.Validation;

using System.Diagnostics.Contracts;

public sealed class ValidationResult
{
    private readonly IReadOnlyCollection<ValidationError> errors;

    private ValidationResult()
        : this([])
    {
    }

    private ValidationResult(IReadOnlyCollection<ValidationError> errors)
    {
        this.errors = errors;
    }

    public static ValidationResult Success { get; } = new() { Succeeded = true };

    public required bool Succeeded { get; init; }

    public IEnumerable<ValidationError> Errors => this.errors;

    [Pure]
    public static ValidationResult Failed(params ValidationError[] errors)
    {
        ArgumentNullException.ThrowIfNull(errors);

        return new ValidationResult(errors) { Succeeded = false };
    }

    [Pure]
    public static ValidationResult Failed(IEnumerable<ValidationError> errors)
    {
        return Failed(errors.ToArray());
    }

    [Pure]
    public IDictionary<string, string[]> AsErrorDictionary()
    {
        return this.errors.ToDictionary(
            error => error.Name,
            error => new string[] { error.Description });
    }
}
