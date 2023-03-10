using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Entities;
using WebAPI.Models;
using WebAPI.Services;

[ApiController]
[Route("/category")]
public class CategoryController : ControllerBase
{

    private readonly IConfiguration config;
    private readonly IMapper mapper;

    private readonly ICategoryRepository repo;
    public CategoryController(
        IConfiguration config,
        IMapper mapper,
        ICategoryRepository repo
    )
    {
        this.mapper = mapper;
        this.config = config;
        this.repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var results =  await repo.GetValues();
        var mapped = mapper.Map<IEnumerable<CategoryDto>>(results);

        return Ok(mapped);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<CategoryDto>> CreateCategory(
        CreateCategoryDto dto
    ) {
        var mapped = mapper.Map<Category>(dto);

        await repo.Create(mapped);

        return Ok(mapper.Map<CategoryDto>(mapped));
    }
    [Authorize(Roles = "Admin")]
    [HttpDelete("{categoryId}")]
    public async Task<ActionResult> DeleteCategory(
        string categoryId
    ) {
        var category = await repo.GetValueByExpression(v => v.Id == new Guid(categoryId));

        if(category == null) {
            return NotFound(new {
                errorMessage = "Category not found"
            });
        }

        await repo.Delete(category);

        return Ok(new {
            message = "Category Deleted"
        });
    }
}