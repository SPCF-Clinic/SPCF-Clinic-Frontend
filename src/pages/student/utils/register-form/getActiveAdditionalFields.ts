export function getActiveAdditionalFields(
  additionalFields: any[] | undefined,
  selectedValue: string | string[] | undefined
) {
  return additionalFields?.filter((subField) => {
    const requiredValue = subField.required_with_field_value;


    if (!requiredValue) {
      return true;
    }


    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(requiredValue);
    }


    return selectedValue === requiredValue;
  });
}