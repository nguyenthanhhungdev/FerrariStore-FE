using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace THebook.Common;

public class QueryObjectIdAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var id = value as string;
        if (string.IsNullOrEmpty(id) || !ObjectId.TryParse(id, out _))
        {
            return new ValidationResult(
                string.Format("'{0}' is not a valid 24 digit hex string.", id)
            );
        }
        return ValidationResult.Success;
    }
}
