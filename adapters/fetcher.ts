export async function fetcher<T>(url: string, token?: string) {
	const config: RequestInit = {
		cache: "no-store",
	};
	if (token) {
		config.headers = {
			...(token && { Authorization: `Bearer ${token}` }),
		};
	}
	const res = await fetch(url, config);
	return res.json() as unknown as T;
}
