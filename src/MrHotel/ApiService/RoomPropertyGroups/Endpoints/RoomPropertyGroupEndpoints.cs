namespace MrHotel.ApiService.RoomPropertyGroups.Endpoints;

using FluentValidation.Results;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.RoomPropertyGroups.Data;
using MrHotel.ApiService.RoomPropertyGroups.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomPropertyGroupEndpoints
{
    public static async Task<Results<Ok<Guid>, ValidationProblem>> HandlePost(
        [FromBody] RoomPropertyGroupCreationData groupCreationData,
        [FromServices] RoomPropertyGroupManager groupManager)
    {
        var propertyGroup = groupCreationData.ToRoomPropertyGroup();

        ValidationResult result = await groupManager.AddPropertyGroup(propertyGroup);

        if (!result.IsValid)
        {
            return TypedResults.ValidationProblem(result.ToDictionary());
        }

        await groupManager.SaveChanges();

        return TypedResults.Ok(propertyGroup.Id);
    }

    public static async Task<Results<NoContent, ValidationProblem, NotFound>> HandlePut(
        [FromRoute] Guid groupId,
        [FromBody] RoomPropertyGroupUpdateData groupUpdateData,
        [FromServices] RoomPropertyGroupManager groupManager)
    {
        RoomPropertyGroup? propertyGroup = await groupManager.TryGetPropertyGroupById(groupId);

        if (propertyGroup is null)
        {
            return TypedResults.NotFound();
        }

        if (!groupUpdateData.IsValid(out ValidationResult updateValidation))
        {
            return TypedResults.ValidationProblem(updateValidation.ToDictionary());
        }

        groupManager.UpdatePropertyGroup(propertyGroup);
        groupUpdateData.ApplyUpdate(propertyGroup);

        await groupManager.SaveChanges();

        return TypedResults.NoContent();
    }

    public static async Task<Results<NoContent, NotFound>> HandleDelete(
        [FromRoute] Guid groupId,
        [FromServices] RoomPropertyGroupManager groupManager)
    {
        RoomPropertyGroup? propertyGroup = await groupManager.TryGetPropertyGroupById(groupId);

        if (propertyGroup is null)
        {
            return TypedResults.NotFound();
        }

        groupManager.DeletePropertyGroup(propertyGroup);

        await groupManager.SaveChanges();

        return TypedResults.NoContent();
    }
}
