export const findSurveys = async () => {
  const response = await fetch("/api/v1/Survey/find", {
    method: "POST",
  });
  return response.json();
};

export const findSurveysByPIDs = async (pIDs: string[]) => {
  const response = await fetch("/api/v1/Survey/findByPIDs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pIDs }),
  });
  return response.json();
};

export const findOneSurvey = async (pID: string, group: string) => {
  const response = await fetch("/api/v1/Survey/findOne", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pID, group }),
  });
  return response.json();
}

export const updateSurvey = async (
  pID: string,
  group: string,
  formData: { [key: string]: any },
) => {
  const response = await fetch("/api/v1/Survey/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pID, group, formData }),
  });
  return response.json();
};
