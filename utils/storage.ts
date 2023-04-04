export const setLocalStorage = (key: string, value: string) => {
	try {
		if (typeof window !== "undefined") {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (e) {
		// catch possible errors:
	}
};

export const getLocalStorage = (key: string) => {
	try {
		if (typeof window !== "undefined") {
			const value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : "";
		}
		return null;
	} catch (e) {
		return e;
	}
};
