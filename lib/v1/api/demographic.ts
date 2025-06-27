export const findDemographic = async () => {
    const response = await fetch('/api/v1/Demographic/find', {
        method: 'POST',
    });
    return response.json();
}

export const findDemographicByPIDs = async (pIDs: string[]) => {
    const response = await fetch('/api/v1/Demographic/findByPIDs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pIDs }),
    });
    return response.json();
}

export const updateDemographic = async (pID: string, data: { [key: string]: any }) => {
    const response = await fetch('/api/v1/Demographic/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pID, data }),
    });
    return response.json();
}