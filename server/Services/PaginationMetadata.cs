namespace WebAPI.Services;

public class PaginationMetadata
{
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalItemCount { get; set; }

    public int TotalPageCount { get; set; }

    public PaginationMetadata(
        int currentPage,
        int pageSize,
        int totalItemCount
    )
    {
        CurrentPage = currentPage;
        PageSize = pageSize;
        TotalItemCount = totalItemCount;
        TotalPageCount = (int)Math.Ceiling(totalItemCount/ (double)pageSize);
    }
}