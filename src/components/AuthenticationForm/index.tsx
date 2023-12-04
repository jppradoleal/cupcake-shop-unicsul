"use client";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email obrigatório" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 12 caracteres" }),
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (!(confirmPassword === password)) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "As senhas não coincidem",
      });
    }
  });

export type UserData = z.infer<typeof registerSchema>;

interface AuthenticationProps {
  isRegister?: boolean;
  onSubmit: (data: UserData) => Promise<void>;
}

export default function AuthenticationForm({
  isRegister,
  onSubmit,
}: AuthenticationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"4xl"}>
              {isRegister ? "Cadastrar sua conta" : "Acessar sua conta"}
            </Heading>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register("email")} />
              <FormErrorMessage>
                {errors.email?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" {...register("password")} />
              <FormErrorMessage>
                {errors.password?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            {isRegister && (
              <FormControl
                id="confirmPassword"
                isInvalid={!!errors.confirmPassword}
              >
                <FormLabel>Confirmar senha</FormLabel>
                <Input type="password" {...register("confirmPassword")} />
                <FormErrorMessage>
                  {errors.confirmPassword?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
            )}
            <Stack spacing={6}>
              {!isRegister && (
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Text color={"blue.500"}>Esqueci minha senha</Text>
                </Stack>
              )}
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                {isRegister ? "Cadastrar" : "Acessar"}
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
