// "use client";
// import { ReactNode, useState } from "react";
// import { AuthContext } from ".";

// const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string>("test");
//   const [username, setUsername] = useState<string>("py")
//   function st(t: string) {
//     setToken(t);
//   }
//   function setName(_: string){
//     setUsername(_)
//   }
//   return (
//     <AuthContext.Provider
//       value={{
//         token: token,
//         setToken: st,
//         username, 
//         setUsername: setName
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
