async function apiClient(endpoint, options) {
    try {
        const res = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic YWRtaW46YWRtaW4='
            }, 
            ...options
        });
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res.json();
    } catch (error) {
        throw new Error(error)
    }
}

export function patchBody(body) {
    return Object.keys(body).map(item => ({propName: item, value: body[item]}));
}

export default apiClient;