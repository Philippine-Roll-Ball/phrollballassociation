
import { apiClient } from "@/services/apiClient";
import type {
    RegisterUser,
    LoginUser,
    AuthResponse
} from "@/types/user";

// REGISTER PLAYER
export const registerPlayer = async (user: RegisterUser) => {
    if (user.password !== user.confirmPassword) {
        throw new Error("Passwords do not match.");
    }

    const address = [
        user.barangay,
        user.city,
        user.province,
        user.region
    ].filter(Boolean).join(", ");

    const payload = {
        email: user.email.trim().toLowerCase(),
        password: user.password,
        contactNumber: user.contactNumber,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        suffix: user.suffix ?? null,
        birthDate: user.birthDate,
        address,
        sex: user.sex,
        educationalAttainment: user.educationalAttainment,
        profileImageUrl: user.profileImageUrl ?? null,
        nationality: user.nationality,
        occupation: user.occupation,
        otherSports: user.otherSports ?? []
    };

    const { data } = await apiClient.post(
        "api/auth/register",
        payload
    );

    // Store the JWT returned after successful registration
    if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("userRole", data.user.role);
    }

    return data as AuthResponse;
};

// EMAIL AND PASSWORD AUTHENTICATION
export const authService = {
    login: async (email: string, password: string) => {
        const payload: LoginUser = {
            email: email.trim().toLowerCase(),
            password
        };

        const { data } = await apiClient.post<AuthResponse>(
            "api/auth/login",
            payload
        );

        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("userRole", data.user.role);

        return data;
    },

    logout: () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userRole");
    }
};
