import { ComponentPropsWithoutRef } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export interface InputProps<T extends FieldValues>
	extends UseControllerProps<T>,
		Omit<ComponentPropsWithoutRef<"input">, "name" | "defaultValue"> {
	/** Field label. This acts as the placeholder until in focus */
	label: string;
	/** Field type. Defaults to "text" */
	type?: "text" | "password" | "email" | "number" | "tel" | "time";
	/** Optional description will show below the input. Will not be shown if the field has an error */
	description?: string;
}

export interface SelectOptionProps {
	value: string | number;
	label: string;
}
export interface SelectProps<T extends FieldValues>
	extends UseControllerProps<T>,
		Omit<ComponentPropsWithoutRef<"button">, "name" | "defaultValue"> {
	/** Field label. This acts as the placeholder until in focus */
	label: string;
	/** Optional description will show below the input. Will not be shown if the field has an error */
	description?: string;
	/** The options to populate the select */
	options: SelectOptionProps[];
}

export interface MenuItemData {
	id: number;
	title: string;
	price: number;
	description?: string;
}

export interface Restaurant {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	category: string;
	imageData: string[];
	userId?: number;
}

export interface SavedRestaurant {
	id: string;
	restaurantId: string;
	userId: string;
}
export interface SessionAccount {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	imageUrl: string;
	address?: string;
	latitude?: number;
	longitude?: number;
	accountType: "GUEST" | "RESTAURANT";
	restaurant?: Restaurant;
	savedRestaurant?: SavedRestaurant[];
}
export interface UserSession {
	isLoggedIn: boolean;
	token?: string;
	account?: SessionAccount;
}

export interface Reservation {
	id: string;
	partySize: number;
	reservationDate: Date;
	reservationTime: string;
	restaurant?: Restaurant;
	user?: SessionAccount;
}

export interface ErrorResponse {
	message: string;
}

export interface ReservationFormData {
	partySize: number;
	reservationDate: Date;
	reservationTime: string;
}

export interface IGuestSignUpForm {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	serverError: () => void;
}

export interface IRestaurantSignUpForm extends IGuestSignUpForm {
	name?: string;
	category?: string;
}

export interface SignupPayload {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	address: string;
	latitude: number;
	longitude: number;
}

export interface RestaurantSignupPayload extends SignupPayload {
	name: string;
	category: string;
	imageData: string[];
}

export interface Account {
	token: string;
	account: SessionAccount;
}

export interface IReservationUpdateResponse {
	id: string;
	partySize: number;
	reservationDate: Date;
	reservationTime: string;
	restaurantId: string;
	userId: string;
}
