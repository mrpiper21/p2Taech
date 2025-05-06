/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAttributes {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	program: string;
	password?: string;
	created_at?: Date;
	updated_at?: Date;
}

interface UserState {
	currentUser: UserAttributes | null;
	loading: boolean;
	error: string | null;
	token: string | null;

	// Actions
	login: (email: string, password: string) => Promise<void>;
	register: (userData: Omit<UserAttributes, "id">) => Promise<void>;
	logout: () => void;
	fetchCurrentUser: () => Promise<void>;
	updateUser: (updates: Partial<UserAttributes>) => Promise<void>;
	deleteUser: () => Promise<void>;
}

const API_URL = "http://localhost:3001/api";

const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			currentUser: null,
			loading: false,
			error: null,
			token: null,

			// Login user
			login: async (email, password) => {
				set({ loading: true, error: null });
				try {
					const response = await axios.post(`${API_URL}/user/auth/login`, {
						email,
						password,
					});

					const { user, token } = response.data;

					set({
						currentUser: user,
						token,
						loading: false,
					});
				} catch (error: any) {
					set({
						error: error.response?.data?.message || "Login failed",
						loading: false,
					});
					throw error;
				}
			},

			// Register new user
			register: async (userData) => {
				set({ loading: true, error: null });
				try {
					const response = await axios.post(
						`${API_URL}/auth/register`,
						userData
					);
					const { user, token } = response.data;

					set({
						currentUser: user,
						token,
						loading: false,
					});
				} catch (error: any) {
					set({
						error: error.response?.data?.message || "Registration failed",
						loading: false,
					});
					throw error;
				}
			},

			// Logout user
			logout: () => {
				set({
					currentUser: null,
					token: null,
				});
			},

			fetchCurrentUser: async () => {
				set({ loading: true });
				try {
					const { token } = get();
					const response = await axios.get(`${API_URL}/users`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					set({
						currentUser: response.data.user,
						loading: false,
					});
				} catch (error: any) {
					set({
						error: error.response?.data?.message || "Failed to fetch user",
						loading: false,
					});
				}
			},

			// Update user
			updateUser: async (updates) => {
				set({ loading: true });
				try {
					const { token, currentUser } = get();
					if (!currentUser) throw new Error("Not authenticated");

					const response = await axios.patch(
						`${API_URL}/users/${currentUser.id}`,
						updates,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					set({
						currentUser: response.data.user,
						loading: false,
					});
				} catch (error: any) {
					set({
						error: error.response?.data?.message || "Update failed",
						loading: false,
					});
					throw error;
				}
			},

			// Delete user
			deleteUser: async () => {
				set({ loading: true });
				try {
					const { token, currentUser } = get();
					if (!currentUser) throw new Error("Not authenticated");

					await axios.delete(`${API_URL}/users/${currentUser.id}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					set({
						currentUser: null,
						token: null,
						loading: false,
					});
				} catch (error: any) {
					set({
						error: error.response?.data?.message || "Delete failed",
						loading: false,
					});
					throw error;
				}
			},
		}),
		{
			name: "user-storage",
			partialize: (state) => ({
				currentUser: state.currentUser,
				token: state.token,
			}),
		}
	)
);

export default useUserStore;
