import { Block } from "./blocks/blocks-collection";
import { Seo } from "./blocks/seo-block";

export interface Page {
  blocks: Block[];
  seo: Seo;
}
