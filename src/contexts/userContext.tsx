import { createContext, FC, ReactNode, useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  sessionToken?: string;
  setSessionToken: (token: string) => void;
  logOut: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  setSessionToken: () => {},
  logOut: () => Promise.resolve(),
});

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSessionToken(data.session?.access_token);
      })
      .catch(() => {
        setSessionToken("");
      });
  }, []);

  async function logOut() {
    setSessionToken("");
    await supabase.auth.signOut();
    navigate("/")
  }

  return (
    <UserContext.Provider value={{ sessionToken, setSessionToken, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
