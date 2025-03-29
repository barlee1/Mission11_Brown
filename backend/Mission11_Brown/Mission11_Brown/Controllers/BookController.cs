using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Brown.Data;

namespace Mission11_Brown.API.Controllers

{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _BookDbContext;

        public BookController(BookDbContext temp)
        {
            _BookDbContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 2, [FromQuery] List<string>? bookTypes = null )
        {
            IQueryable<Book> query = _BookDbContext.Books.AsQueryable();
            
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            var totalNumBooks = query.Count();
            
            var bookList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var returnObject = new
            {
                bookList = bookList,
                totalNumBooks = totalNumBooks
            };
            
            return Ok(returnObject);
            return Ok(bookList);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetProjectTypes()
        {
            var bookTypes = _BookDbContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }
    }
}