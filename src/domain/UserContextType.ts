import { UserType } from "./UserType.ts";

export interface UserContextType {
    user: UserType | null;
    contextLogout: () => void;
    contextLogin: () => void;
    loading: boolean;
}