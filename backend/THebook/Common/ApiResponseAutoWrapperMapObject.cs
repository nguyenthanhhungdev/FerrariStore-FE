using AutoWrapper;

namespace THebook.Common
{
    public class ApiResponseAutoWrapperMapObject
    {
        [AutoWrapperPropertyMap(Prop.Result)]
        public object? Data { get; set; }
    }
}
