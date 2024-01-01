// import { createContext, useContext } from "react";
// interface AuthContextProps {
//   token: string;
//   setToken: (_: string) => void;
//   username: string, 
//   setUsername: (_: string) => void;
// }
// export const AuthContext = createContext<AuthContextProps | undefined>(
//   undefined
// );
// export function useAuthContext() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("Auth Context must be used within AuthContextProvider");
//   }
//   return ctx;
// }
