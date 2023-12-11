import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email obrigatório" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 12 caracteres" }),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "As senhas não coincidem",
      });
    }
  });

export type UserData = z.infer<typeof registerSchema>;
