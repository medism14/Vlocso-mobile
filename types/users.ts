export interface UserType {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    type: string;
    phoneNumber: string;
    country: string;
    city: string;
    urlImageUser: string;
    unreadCountNotifications: number;
    lastLogin: Date;
    emailVerified: boolean;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiration: Date | null;
    passwordVerificationToken: string | null;
    passwordVerificationTokenExpiration: Date | null;
    isActive: boolean;
    authProviderId: string;
    createdAt: Date;
    updatedAt: Date;
}
