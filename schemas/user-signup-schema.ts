import { z } from "zod";
export const UserSignUpSchema = z.object({
  userName: z.string().min(5),
  userEmail: z.string().email(),
  userPwd: z.string().min(5),
  userConfirmPwd: z.string(),
});
export type UserSignUpSchemaType = z.infer<typeof UserSignUpSchema>;
