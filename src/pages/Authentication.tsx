import { Container } from "@chakra-ui/react";
import AuthenticationForm from "../components/AuthenticationForm";

interface AuthenticationProps {
  isRegister?: boolean
}

export default function Authentication({ isRegister }: AuthenticationProps) {
  return (
    <Container maxW={"10xl"} margin={0} padding={0}>
      <AuthenticationForm isRegister={isRegister}/>
    </Container>
  )
}
