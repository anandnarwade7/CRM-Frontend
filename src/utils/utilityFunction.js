import { format } from "date-fns";

// Function for Converting Upper Case to Lower Case.
export const getLowerStatus = (status) => {
  if (!status) {
    return "N/A";
  }

  if (status === "ASSIGNED") {
    return "Assigned";
  } else if (status === "COMPLETED") {
    return "Completed";
  } else if (status === "HOT") {
    return "Hot";
  } else if (status === "COLD") {
    return "Cold";
  } else if (status === "REJECTED") {
    return "Rejected";
  } else if (status == "CONVERTED") {
    return "Converted";
  }
};

// Function for Formatting the Date
export const formatDate = (milliseconds) => {
  if (!milliseconds) return "N/A"; // Handle missing values
  return format(new Date(milliseconds), "dd/MM/yyyy");
};

// Function for adding ... at the end of the string
export const truncateName = (str, maxLength = 10) => {
  return str.length > maxLength ? str.slice(0, maxLength - 1) + "..." : str;
};
