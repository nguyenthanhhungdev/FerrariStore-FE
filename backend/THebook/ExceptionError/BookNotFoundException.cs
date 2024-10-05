using System.Net;

namespace THebook.ExceptionError;

public class BookNotFoundException(string id)
    : BaseException($"E::product with id {id} not found", HttpStatusCode.NotFound);