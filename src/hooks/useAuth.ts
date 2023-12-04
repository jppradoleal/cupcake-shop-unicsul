import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function useAuth() {
  const { sessionToken, setSessionToken, logOut } = useContext(UserContext);

  return {
    setSessionToken,
    isAuthenticated: !!sessionToken,
    logOut
  };
}
