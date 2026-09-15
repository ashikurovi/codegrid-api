export declare enum UserRole {
    CUSTOMER = "customer",
    ADMIN = "admin",
    MANAGER = "manager"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password?: string;
    phone: string;
    deliveryaddress: string;
    division: string;
    city: string;
    role: UserRole;
    picture: string;
    isBanned: boolean;
}
