import { Container, useToast } from "@chakra-ui/react";
import AuthenticationForm from "../components/AuthenticationForm";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { UserData } from "../schemas/auth.schema";

interface AuthenticationProps {
  isRegister?: boolean;
}

export default function Authentication({ isRegister }: AuthenticationProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const { setSessionToken } = useAuth()

  async function onSubmit(data: UserData) {
    if (isRegister) {
      const authResponse = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authResponse.error) {
        toast({
          title: "Erro ao processar",
          description: authResponse.error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Usuário registrado",
        description: "Confirme seu cadastro no email",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/login");
      
      return;
    }
    
    const loginResponse = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    
    if (loginResponse.error) {
      toast({
        title: "Erro ao processar",
        description: loginResponse.error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setSessionToken(loginResponse.data.session.access_token)

    navigate("/");
  }

  return (
    <Container maxW={"10xl"} margin={0} padding={0}>
      <AuthenticationForm isRegister={isRegister} onSubmit={onSubmit} />
    </Container>
  );
}
