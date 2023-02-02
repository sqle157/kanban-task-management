import { useState, useCallback, useRef, useEffect } from 'react';

type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH';

// Custom hooks to handle fetch request for boards
export const useFetch = <T>() => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const activeRequest = useRef<AbortController[]>([]);

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

			// Set controller signal
			const abortController = new AbortController();
			activeRequest.current.push(abortController);

			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
					signal: abortController.signal,
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message);
				}

				setLoading(false);

				return data;
			} catch (e) {
				// set the error
				if (
					e instanceof Error &&
					e.message !== 'The user aborted a request.' &&
					e.message !== 'The operation was aborted. ' &&
					e.message !== 'Fetch is aborted'
				) {
					// Catch & set the error
					setError(e.message);
					setLoading(false);
					throw e;
				}
			}
		},
		[]
	);

	// abort the current request everytime the component re-renders
	useEffect(() => {
		// test
		return () => {
			activeRequest.current.forEach((request) => request.abort());
		};
	}, []);

	return { loading, error, sendFetchRequest };
};
