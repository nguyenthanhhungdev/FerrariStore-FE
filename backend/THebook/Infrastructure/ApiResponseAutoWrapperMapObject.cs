using AutoWrapper;

namespace THebook.Infrastructure
{
    public class ApiResponseAutoWrapperMapObject
    {
        [AutoWrapperPropertyMap(Prop.Result)]
        public object? Data { get; set; }
    }
}
