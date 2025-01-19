// src/services/authService.ts
import axios, { AxiosResponse } from 'axios';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
// Define the structure of the response data
interface LoginResponse {
    userID: string;
}

// Define the function to handle login
const login = async (username: string, password: string): Promise<{ success: boolean; userID?: string; message?: string }> => {
    try {
        // Send POST request to the Go API
        const response: AxiosResponse<LoginResponse> = await axios.post('http://localhost:PORT/api/login', {
            username: username,
            password: password,
        });

        // If login is successful, return the userID
        return { success: true, userID: response.data.userID };
    } catch (error: any) {
        // If there's an error (e.g., invalid credentials), return the error message
        return { success: false, message: 'Invalid credentials. Please try again.' };
    }
};

const loginWithGoogle = async (): Promise<{ token: string, email: string, name: string }> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        const email = result.user.email || "";
        const name = result.user.displayName || "";
        return { token, email, name };
    } catch (err) {
        throw new Error("gooogle login failed");
    }
}
export default {
    login,
    loginWithGoogle
};
