import z from "zod";

export const SocialNetworksSchema = z.array(
  z.object({
    name: z.string(),
    link: z.string(),
  })
);