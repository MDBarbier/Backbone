using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackboneJSDemo3.Models
{
    public class BooksDAL
    {
        
        public IEnumerable<Book> GetBooks(Dictionary<int, string> values)
        {
            using (BooksEntities dc = new BooksEntities())
            {
                var books = dc.Tables.ToList();

                foreach (var b in books)
                {
                    yield return new Book() { ID = b.BookID, BookName = b.BookName };
                }
            }
        }

        public class Book
        {
            public int ID { get; set; }
            public string BookName { get; set; }
        }
    }
}