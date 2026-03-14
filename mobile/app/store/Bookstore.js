import { create } from "zustand";
import api from "../services/api";

const useBookStore = create((set) => ({
    book: null,
    books: [],
    mybooks: [],
    totalBooks: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,

    createbook: async (bookname, caption, starrating, image) => {
        set({ loading: true, error: null });
        console.log("Creating book with", bookname, caption, starrating, image);
        try {
            const response = await api.post("/books/create", { bookname, caption, starrating, image });
            const { book } = response.data;
            set({ book });
            return { success: true, book, message: "Book created successfully" };
        } catch (error) {
            set({ error: error.message });
            console.log("Book Creation Error:", error.response?.data);
            return { success: false, error: error.response?.data?.message || "Book creation failed", message: "Book creation failed" };
        } finally {
            set({ loading: false });
        }
    },

    getbooks: async (page = 1, limit = 5) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/books/getbooks?page=${page}&limit=${limit}`);
            console.log("Fetched books:", response.data.books.length);
            set((state) => ({ 
                books: page === 1 ? response.data.books : [...state.books, ...response.data.books],
                totalBooks: Number(response.data.totalbooks),
                currentPage: Number(response.data.currentpage),
                totalPages: Number(response.data.totalpages)
            }));
            return { success: true, books: response.data.books };
        } catch (error) {
            set({ error: error.message });
            console.log("Get Books Error:", error.response?.data);
            return { success: false, error: error.response?.data?.message || "Get books failed", message: "Get books failed" };
        } finally {
            set({ loading: false });
        }
    },

    getmybooks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/books/mybooks`);
            set({ mybooks: response.data.books });
            return { success: true, mybooks: response.data.books };
        } catch (error) {
            set({ error: error.message });
            console.log("Get My Books Error:", error.response?.data);
            return { success: false, error: error.response?.data?.message || "Get my books failed", message: "Get my books failed" };
        } finally {
            set({ loading: false });
        }
    },

    deletebook: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await api.delete(`/books/delete/${id}`);
            // Remove book from 'mybooks' and 'books' lists
            set((state) => ({
                mybooks: state.mybooks.filter((book) => book._id !== id),
                books: state.books.filter((book) => book._id !== id)
            }));
            return { success: true, message: "Book deleted successfully" };
        } catch (error) {
            set({ error: error.message });
            console.log("Delete Book Error:", error.response?.data);
            return { success: false, error: error.response?.data?.message || "Delete book failed", message: "Delete book failed" };
        } finally {
            set({ loading: false });
        }
    },
}));

export default useBookStore;
