
export interface User {
    userID: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    educationalAttainment: string;
    occupation: string;
    sex: string;
    contactNumber: string;
    address: string;
    profileImageUrl?: string | null;
    otherSports?: string[];
    role: string;
    email: string;
    dateRegistered?: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    confirmPassword: string;

    firstName: string;
    middleName: string;
    lastName: string;
    suffix?: string | null;

    birthDate: string;
    nationality: string;
    educationalAttainment: string;
    occupation: string;
    sex: string;
    contactNumber: string;

    region: string;
    province: string;
    city: string;
    barangay: string;

    address: string;
    profileImageUrl?: string | null;
    otherSports?: string[];
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface Region {
    id: number;
    psgc_code: string;
    region_name: string;
    region_code: string;
}

export interface Province {
    province_code: string;
    province_name: string;
    psgc_code: string;
    region_code: string;
}

export interface Municipality {
    city_code: string;
    city_name: string;
    province_code: string;
    psgc_code: string;
    region_desc: string;
}

export interface Barangay {
    brgy_code: string;
    brgy_name: string;
    city_code: string;
    province_code: string;
    region_code: string;
}
