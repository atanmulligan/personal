export const findParticipants = async () => {
    const response = await fetch('/api/v1/Participant/find', {
        method: 'POST',
    });
    return response.json();
}

export const findParticipantsByPIDs = async (pIDs: string[]) => {
    const response = await fetch('/api/v1/Participant/findByPIDs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pIDs }),
    });
    return response.json();
}

export const updateParticipant = async (pID: string, data: { [key: string]: any }) => {
    const response = await fetch('/api/v1/Participant/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pID, data }),
    });
    return response.json();
}
