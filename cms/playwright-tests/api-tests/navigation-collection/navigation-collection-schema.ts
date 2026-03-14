import z from "zod";
import { PageSchema } from "../../block-schemas";

const NavItemSchema = z.object({
  name: z.string(),
  link: z.string()
});

const NavigationItemSchema = PageSchema.extend({
  isMultiLevelNavigation: z.boolean(),
  name: z.string(),
  link: z.string()
    .nullish(),
  navItems: z.array(NavItemSchema),
});

export const NavigationSchema = z.array(NavigationItemSchema);