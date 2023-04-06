import { z } from "zod";

export const UserInfos = z.object({
  age: z.number().min(0).max(150),
  heightInCentimeters: z.number().min(0).max(250),
  objective: z.enum(["LOSE_WEIGHT", "GAIN_MUSCLE", "MAINTAIN_WEIGHT"]),
});

export enum UserInfosENUM {
  age= "age",
  heightInCentimeters= "heightInCentimeters",
  objective= "objective",
}

export type UserInfosType = z.infer<typeof UserInfos>;
