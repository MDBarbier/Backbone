using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackboneJSDemo3.Models;

namespace BackboneJSDemo3.Controllers
{    
    public class BooksController : ApiController
    {
        // GET api/values
        public IEnumerable<Table> Get()
        {
            using (BooksEntities entities = new BooksEntities())
            {
                return entities.Tables.ToList<Table>();
            }
        }

        //// GET api/values/5
        //public Table Get(int id)
        //{
        //    using (BooksEntities entities = new BooksEntities())
        //    {
        //        return entities.Tables.SingleOrDefault<Table>(b => b.BookID == id);
        //    }
        //}

        // GET api/values/5
        public dynamic Get(int id)
        {
            using (BooksEntities entities = new BooksEntities())
            {
                var result = entities.Tables.SingleOrDefault<Table>(b => b.BookID == id);

                if (result != null)
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound);

                //return result;
            }
        }

        // POST api/values
        public HttpResponseMessage Post(Table value)
        {
            try
            {
                ModelState.Remove("value.ID");
                if (ModelState.IsValid)
                {
                    using (BooksEntities entities = new BooksEntities())
                    {
                        //entities.Tables.Ins(value);
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.Created, value);
                    }
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "Model state is invalid");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // PUT api/values/5
        public HttpResponseMessage Put(int id, Table value)
        {
            try
            {
                using (BooksEntities entities = new BooksEntities())
                {
                    Table foundBook = entities.Tables.SingleOrDefault<Table>(b => b.Id == id);
                    foundBook.BookName = value.BookName;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, value);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // DELETE api/values/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (BooksEntities entities = new BooksEntities())
                {
                    Table foundBook = entities.Tables.SingleOrDefault<Table>(b => b.BookID == id);
                    //entities.Tables.DeleteObject(foundBook);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, foundBook);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}
