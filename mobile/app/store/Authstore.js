import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    loading: false,

    register: async (fullName, email, password) => {
        set({ loading: true });
        try {
           const response = await api.post("/signup", { fullName, email, password });
           const { user, token } = response.data;
           set({ user, token });
           await AsyncStorage.setItem("token", token);
           await AsyncStorage.setItem("user", JSON.stringify(user));
           return {succes: true} 
        } catch (error) {
            set({ error: error.message });
            console.log('====================================');
            console.log("error here");
            console.log('====================================');
            return {succes: false, error: error.message}
        } finally {
            set({ loading: false });
        }
    }
}));

export default useAuthStore;