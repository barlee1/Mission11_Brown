using Microsoft.AspNetCore.Mvc;
using Mission11_Brown.Data;

namespace Mission11_Brown.Controllers

{
    [ApiController]
    [Route("[controller]")]

    public class BookController : ControllerBase
    {
        private BookDbContext _bookDbContext;

        public BookController(BookDbContext temp)
        {
            _bookDbContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 2, [FromQuery] List<string>? bookTypes = null )
        {
            IQueryable<Book> query = _bookDbContext.Books.AsQueryable();
            
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
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetProjectTypes()
        {
            var bookTypes = _bookDbContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newbook)
        {
            _bookDbContext.Books.Add(newbook);
            _bookDbContext.SaveChanges();
            return Ok(newbook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookDbContext.Books.Find(bookId);
            
            existingBook.Title = updatedBook.Title;
            existingBook.Category = updatedBook.Category;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Price = updatedBook.Price;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.ISBN = updatedBook.ISBN;
            
            _bookDbContext.Books.Update(existingBook);
            _bookDbContext.SaveChanges();
            
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookDbContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }
            
            _bookDbContext.Books.Remove(book);
            _bookDbContext.SaveChanges();
            
            return NoContent();
        }
    }
}