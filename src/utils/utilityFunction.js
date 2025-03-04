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
