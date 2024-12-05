using AutoWrapper;

namespace BanSach.Infrastructure
{
    public class ApiResponseAutoWrapperMapObject
    {
        [AutoWrapperPropertyMap(Prop.Result)]
        public object? Data { get; set; }
    }
}
