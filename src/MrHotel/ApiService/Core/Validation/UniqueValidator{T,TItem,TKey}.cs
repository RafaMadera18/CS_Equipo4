namespace MrHotel.ApiService.Core.Validation;

using System.Linq.Expressions;
using System.Reflection;

using FluentValidation;
using FluentValidation.Internal;
using FluentValidation.Validators;

using RaptorUtils.Collections.Extensions;

public class UniqueValidator<T, TItem, TKey>(Expression<Func<TItem, TKey>> selector)
    : PropertyValidator<T, IEnumerable<TItem>>
{
    private readonly Func<TItem, TKey> selector = selector.Compile();

    private readonly string itemName = ValidatorOptions.Global.PropertyNameResolver(
        typeof(T), selector.GetMember(), selector);

    public override string Name => "UniqueValidator";

    public override bool IsValid(ValidationContext<T> context, IEnumerable<TItem> value)
    {
        bool containsDuplicates = value.Select(this.selector).ContainsDuplicates();

        if (containsDuplicates)
        {
            context.MessageFormatter.AppendArgument("ItemName", this.itemName);
        }

        return !containsDuplicates;
    }

    protected override string GetDefaultMessageTemplate(string errorCode)
    {
        return "'{ItemName}' must be unique in '{PropertyName}'.";
    }
}
