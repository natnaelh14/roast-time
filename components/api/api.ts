import axios, { AxiosRequestHeaders, AxiosError } from "axios";
import {
	UserSession,
	SignupPayload,
	Account,
	RestaurantSignupPayload,
	SessionAccount,
	SavedRestaurant,
	IReservationUpdateResponse,
} from "types";

type IRequestResponse<T> =
	| {
			data: T;
			isSuccess: true;
	  }
	| {
			error: AxiosError;
			isSuccess: false;
	  };

export const getSession = async () => {
	try {
		const { data } = await axios.get<UserSession>("/api/user");
		return { data, hasError: false };
	} catch (e) {
		if (e instanceof Error) {
			return { e, hasError: true };
		}
	}
};

const getHeader = (token?: string): AxiosRequestHeaders => {
	return {
		"Content-type": "application/json",
		"Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_BASE_URL}`,
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, PUT",
		Authorization: `Bearer ${token}`,
	};
};
const AXIO_TIMEOUT = 30000;

export const login = async (payload: { email: string; password: string }): Promise<IRequestResponse<Account>> => {
	try {
		const { data } = await axios.post<Account>(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, payload);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const updateAccount = async (
	token: string,
	accountId: string,
	accountPayload: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
	},
): Promise<IRequestResponse<SessionAccount>> => {
	try {
		const { data } = await axios.put<SessionAccount>(
			`${process.env.NEXT_PUBLIC_BASE_URL}/account/${accountId}/update`,
			accountPayload,
			{
				timeout: AXIO_TIMEOUT,
				headers: getHeader(token),
			},
		);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const guestSignup = async (payload: SignupPayload): Promise<IRequestResponse<Account>> => {
	try {
		const { data } = await axios.post<Account>(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
			...payload,
			accountType: "GUEST",
		});
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const restaurantSignup = async (payload: RestaurantSignupPayload): Promise<IRequestResponse<Account>> => {
	try {
		const { data } = await axios.post<Account>(`${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/register`, {
			...payload,
			accountType: "RESTAURANT",
		});
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const updateReservation = async ({
	token,
	accountId,
	reservationId,
	reservation,
}: {
	token: string;
	accountId: string;
	reservationId: string;
	reservation: {
		partySize: number;
		reservationDate: Date;
		reservationTime: string;
	};
}): Promise<IRequestResponse<IReservationUpdateResponse>> => {
	try {
		const { data } = await axios.put<IReservationUpdateResponse>(
			`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/${accountId}/update/${reservationId}`,
			reservation,
			{
				timeout: AXIO_TIMEOUT,
				headers: getHeader(token),
			},
		);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const deleteReservation = async (
	token: string,
	accountId: string,
	reservationId: string,
): Promise<IRequestResponse<{ message: string }>> => {
	try {
		const { data } = await axios.delete<{ message: string }>(
			`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/${accountId}/delete/${reservationId}`,
			{
				timeout: AXIO_TIMEOUT,
				headers: getHeader(token),
			},
		);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const handleReservation = async (reservation: {
	token: string;
	userId: string;
	reservationId: string;
	partySize: number;
	reservationDate: Date;
	reservationTime: string;
}) => {
	try {
		const { token, ...reservationPayload } = reservation;
		const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation`, reservationPayload, {
			timeout: AXIO_TIMEOUT,
			headers: getHeader(token),
		});
		return { data, hasError: false };
	} catch (e) {
		if (e instanceof Error) {
			return { e, hasError: true };
		}
	}
};

export const saveRestaurant = async (
	token: string | undefined,
	accountId: string | undefined,
	restaurantId: string | undefined,
): Promise<IRequestResponse<SavedRestaurant>> => {
	try {
		const { data } = await axios.post<SavedRestaurant>(
			`${process.env.NEXT_PUBLIC_BASE_URL}/save/${accountId}/restaurant/${restaurantId}`,
			{},
			{
				timeout: AXIO_TIMEOUT,
				headers: getHeader(token),
			},
		);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const removeSavedRestaurant = async (
	token: string | undefined,
	accountId: string | undefined,
	restaurantId: string | undefined,
): Promise<IRequestResponse<SavedRestaurant>> => {
	try {
		const { data } = await axios.delete<SavedRestaurant>(
			`${process.env.NEXT_PUBLIC_BASE_URL}/delete/${accountId}/restaurant/${restaurantId}`,
			{
				timeout: AXIO_TIMEOUT,
				headers: getHeader(token),
			},
		);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const updateReservationByRestaurant = async (
	token: string,
	restaurantId: string,
	reservationId: string,
	reservationPayload: {
		partySize: number;
		reservationDate: Date;
		reservationTime: string;
	},
): Promise<IRequestResponse<IReservationUpdateResponse>> => {
	try {
		const { data } = await axios.put<IReservationUpdateResponse>(
			`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/${reservationId}/restaurant/${restaurantId}`,
			reservationPayload,
			{
				timeout: AXIO_TIMEOUT,
				headers: getHeader(token),
			},
		);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const deleteReservationByRestaurant = async (
	token: string,
	restaurantId: string,
	reservationId: string,
): Promise<IRequestResponse<{ message: string }>> => {
	try {
		const { data } = await axios.delete<{ message: string }>(
			`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/${reservationId}/restaurant/${restaurantId}`,
			{
				timeout: AXIO_TIMEOUT,
				headers: getHeader(token),
			},
		);
		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const validatePhoneNumber = async (phoneNumber: string): Promise<IRequestResponse<{ isValid: boolean }>> => {
	try {
		const { data } = await axios.get<{
			isValid: boolean;
		}>(`${process.env.NEXT_PUBLIC_BASE_URL}/validate/phoneNumber/${phoneNumber}`, {
			timeout: AXIO_TIMEOUT,
			headers: getHeader(),
		});

		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};

export const validateEmail = async (email: string): Promise<IRequestResponse<{ isValid: boolean }>> => {
	try {
		const { data } = await axios.get<{
			isValid: boolean;
		}>(`${process.env.NEXT_PUBLIC_BASE_URL}/validate/email/${email}`, {
			timeout: AXIO_TIMEOUT,
			headers: getHeader(),
		});

		return { data, isSuccess: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { error, isSuccess: false };
		}
		return { error: new AxiosError("Bad Request"), isSuccess: false };
	}
};
