// Function for Converting Upper Case to Lower Case.
export const getLowerStatus = (status) => {
  if (!status) {
    return "N/A";
  }

  if (status === "ASSIGNED") {
    return "Assigned";
  } else if (status === "COMPLETED") {
    return "Completed";
  }
};
