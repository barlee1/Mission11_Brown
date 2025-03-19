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
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 2 )
        {
            var bookList = _BookDbContext.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _BookDbContext.Books.Count();

            var returnObject = new
            {
                bookList = bookList,
                totalNumBooks = totalNumBooks
            };
            
            return Ok(returnObject);
            return Ok(bookList);
        }
    }
}