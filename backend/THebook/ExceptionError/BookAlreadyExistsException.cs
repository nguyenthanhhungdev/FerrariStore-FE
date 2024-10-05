using System.Net;

namespace THebook.ExceptionError;

public class BookAlreadyExitsException(string name)
    : BaseException($"E::Book with name {name} is already exits", HttpStatusCode.Conflict);