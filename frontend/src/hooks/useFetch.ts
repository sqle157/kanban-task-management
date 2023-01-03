import { useState, useCallback } from 'react';

type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH';

// Custom hooks to handle fetch request for boards
export const useFetch = <T>() => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Handle fetch request
	const sendFetchRequest = useCallback(
		async (
			url: string,
			method: MethodType = 'GET',
			body: BodyInit | null = null,
			headers: HeadersInit = {}
		): Promise<T | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(url, { method, body, headers });
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message);
				}

				setLoading(false);

				return data;
			} catch (error) {
				// set the error
				if (error instanceof Error) {
					setError(error.message);
					setLoading(false);
				}
			}
		},
		[]
	);

	return { loading, error, sendFetchRequest };
};
