export const data_type = (type_name: string) => {
    if (type_name === "Short Text" || type_name === "Long Text") {
      return "Text";
    }

    if (type_name === "Date") {
      return "Date";
    }

    if (type_name === "Radio") {
      return "Radio";
    }

    if (type_name === "Divider") {
      return "Divider";
    }
    
    if (type_name === "Dropdown") {
      return "Dropdown";
    }

    if (type_name === "Checkbox") {
      return "Checkbox";
    }
  };