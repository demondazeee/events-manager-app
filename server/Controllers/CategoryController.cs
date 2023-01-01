using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
}