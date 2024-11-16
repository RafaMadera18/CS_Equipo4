namespace MrHotel.ApiService.Core.Validation;

using System.Linq.Expressions;

using FluentValidation;

public static class ValidatorExtensions
{
    public static IRuleBuilderOptions<T, IEnumerable<TItem>> Unique<T, TItem, TKey>(
        this IRuleBuilder<T, IEnumerable<TItem>> ruleBuilder,
        Expression<Func<TItem, TKey>> selector)
    {
        return ruleBuilder.SetValidator(new UniqueValidator<T, TItem, TKey>(selector));
    }
}
