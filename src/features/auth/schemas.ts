import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().trim().min(1, "email is required"),
    password: z.string().min(8, "min of 8").max(256),
});

export const signUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().email().trim().min(1, "email is required"),
    password: z.string().min(8, "min of 8").max(256)
})


/**@Types */
export type TSignUp = z.infer<typeof signUpSchema>;