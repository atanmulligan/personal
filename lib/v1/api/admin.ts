export const checkPassword = async (password: string) => {
    const response = await fetch('/api/v1/Admin/checkPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });
    return response.json();
}
