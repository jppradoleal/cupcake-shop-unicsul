import { createContext, FC, ReactNode, useEffect, useState } from "react";
import supabase from "../supabase";

type UserContextType = {
  sessionToken?: string;
  setSessionToken: (token: string) => void;
  logOut: () => Promise<void>
};

export const UserContext = createContext<UserContextType>({
  setSessionToken: () => {},
  logOut: () => Promise.resolve()
});

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | undefined>();

  useEffect(() => {
    setSessionToken(localStorage.getItem("ck#session") || "");
  }, []);

  useEffect(() => {
    if (!sessionToken) {
      localStorage.removeItem("ck#session")
      return 
    }

    localStorage.setItem("ck#session", sessionToken!);
  }, [sessionToken]);

  async function logOut() {
    setSessionToken("");
    await supabase.auth.signOut()
  }

  return (
    <UserContext.Provider value={{ sessionToken, setSessionToken, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
