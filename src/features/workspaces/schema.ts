import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  userId: z.string().trim().min(1, "UserId is required").optional(),
  image: z.union([
    z.instanceof(File),
    z.string().transform( value => value === "" ? undefined : value)
  ]).optional()
})

export type WorkspaceSchemaType = z.infer<typeof workspaceSchema>;