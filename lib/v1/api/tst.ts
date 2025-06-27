export const findTsts = async () => {
  const response = await fetch("/api/v1/Tst/find", {
    method: "POST",
  });
  return response.json();
};

export const findTstsByPIDs = async (pIDs: string[]) => {
  const response = await fetch("/api/v1/Tst/findByPIDs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pIDs }),
  });
  return response.json();
};

export const findOneTst = async (pID: string) => {
  const response = await fetch("/api/v1/Tst/findOne", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pID }),
  });
  return response.json();
}

export const updateTst = async (pID: string, data: { [key: string]: any }) => {
  const response = await fetch("/api/v1/Tst/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pID, data }),
  });
  return response.json();
};

export const generateTst = async (systemMessage: string) => {
  const response = await fetch("/api/v1/Tst/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ systemMessage }),
  });
  return response.json();
}

export const formatTST = (jsonString: string) => {
  try {
    const tst = JSON.parse(jsonString);
    return {
      result: "success",
      open_self: tst.result.open_self,
      hidden_self: tst.result.hidden_self,
    };
  } catch (error) {
    return { result: "error", error, open_self: [], hidden_self: [] };
  }
};

type TSTItem = {
  text: string;
  checked: boolean;
  selfType: string;
  condition: string;
}

type TST = {
  open_self: string[];
  hidden_self: string[];
}

export const getTSTItems = (tst: TST, condition: string) => {
  const tstItems = [] as TSTItem[];
  tst.open_self.forEach((text: string) => {
    tstItems.push({ text, checked: false, selfType: "open_self", condition });
  });
  tst.hidden_self.forEach((text: string) => {
    tstItems.push({ text, checked: false, selfType: "hidden_self", condition });
  });
  return tstItems;
}