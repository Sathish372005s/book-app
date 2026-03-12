import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    loading: false,

    register: async (username, email, password) => {
        set({ loading: true });
        console.log("Sending data:", username, email, password);
        try {
           const response = await api.post("/signup", { username, email, password });
           const { user, token } = response.data;
           set({ user, token });
           await AsyncStorage.setItem("token", String(token));
           await AsyncStorage.setItem("user", JSON.stringify(user));
           return {success: true, user , token , message: "Signup successful"} 
        } catch (error) {
            set({ error: error.message });
            console.log("Signup Error:", error.response?.data);
            return { success: false, error: error.response?.data?.message || "Signup failed", message: "Signup failed" };
        } finally {
            set({ loading: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true });
        console.log("Logging in with", email, password);
        try {
            const response = await api.post("/login", { email, password });
            const { user, token } = response.data;
            set({ user, token });
            await AsyncStorage.setItem("token", String(token));
            await AsyncStorage.setItem("user", JSON.stringify(user));
            return { success: true, user, token, message: "Login successful" };
        } catch (error) {
            set({ error: error.message });
            console.log("Login Error:", error.response?.data);
            return { success: false, error: error.response?.data?.message || "Login failed", message: "Login failed" };
        } finally {
            set({ loading: false });
        }
    },

    checkAuth: async () => {
        try {
            const token=await AsyncStorage.getItem("token");
            const userjson=await AsyncStorage.getItem("user");
            const user=userjson ? JSON.parse(userjson) : null;
            set({ user, token });
        } catch (error) {
            console.log("Auth Check Error:", error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            set({ user: null, token: null });
        } catch (error) {
            console.log("Logout Error:", error);
        }
    }
}));

export default useAuthStore;