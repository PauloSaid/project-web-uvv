export function request<TResponse>(
    url: string,
    config: RequestInit = {}
): Promise<TResponse> {
    return fetch(url, config)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição');
            }
            return response.json();
        })
        .then((response) => response as TResponse)
        .catch((error) => {
            console.error('Erro na requisição:', error);
            throw error;
        });
}
