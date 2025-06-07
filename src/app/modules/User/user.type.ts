
export type TDesignation = "Business Owner" | "Sales Executive";
export type TUserStatus = "active" | "inactive";
export type TVerification = "verified" | "unverified" | "pending";

export type TUser = {
    // Basic Info
    name: string;
    email: string;
    password: string;
    mobile: string;
    photo: string;
    organizationName: string
    // Identification
    nid?: number;
    birthCertificate?: number;
    // Employment Info
    designation: TDesignation;
    salary?: number;
    joiningDate: string;
    // Additional Info
    address?: string;
    status?: TUserStatus;
    verification?: TVerification,
};

