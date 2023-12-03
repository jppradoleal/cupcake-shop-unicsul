"use client";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

interface AuthenticationProps {
  isRegister?: boolean;
}

export default function AuthenticationForm({
  isRegister,
}: AuthenticationProps) {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <form>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"4xl"}>
                { isRegister ? "Cadastrar sua conta" : "Acessar sua conta" }</Heading>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            {isRegister && (
              <FormControl id="password">
                <FormLabel>Confirmar senha</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
            )}
            <Stack spacing={6}>
              {!isRegister && (
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Lembrar de mim</Checkbox>
                  <Text color={"blue.500"}>Esqueci minha senha</Text>
                </Stack>
              )}
              <Button colorScheme={"blue"} variant={"solid"}>
                { isRegister ? "Cadastrar" : "Acessar" }
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Foto de Gowtham AGM na Unsplash"}
          objectFit={"cover"}
          src={"/baking-cupcakes.jpg"}
        />
      </Flex>
    </Stack>
  );
}
