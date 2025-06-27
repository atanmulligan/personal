export const findEssays = async () => {
    const response = await fetch('/api/v1/Essay/find', {
        method: 'POST',
    });
    return response.json();
}

export const findEssaysByPIDs = async (pIDs: string[]) => {
    const response = await fetch('/api/v1/Essay/findByPIDs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pIDs }),
    });
    return response.json();
}

export const findOneEssay = async (pID: string, essayNumber: string, condition: string) => {
    const parsedEssayNumber = parseInt(essayNumber);
    const response = await fetch('/api/v1/Essay/findOne', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pID, essayNumber: parsedEssayNumber, condition }),
    });
    return response.json();
}

export const findEssaysByEssayNum = async (pID: string, essayNumber: string) => {
    const parsedEssayNumber = parseInt(essayNumber);
    const response = await fetch('/api/v1/Essay/findByEssayNum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pID, essayNumber: parsedEssayNumber }),
    });
    return response.json();
}
export const updateEssay = async (pID: string, index: string, condition: string, data: { [key: string]: any }) => {
    const essayNumber = parseInt(index);
    const response = await fetch('/api/v1/Essay/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pID, essayNumber, condition, data }),
    });
    return response.json();
}

export const generateEssay = async (systemMessage: string) => {
    const response = await fetch('/api/v1/Essay/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ systemMessage }),
    });
    return response.json();
}