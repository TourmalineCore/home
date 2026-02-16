import { ThreeColumnGridBlock } from "./three-column-grid-block";
import { CollageWithLinkBlock } from "./collage-with-link-block";
import { CollageWithTitleBlock } from "./collage-with-title-block";
import { FormBlock } from "./form-block";
import { HeroBlock } from "./hero-block";
import { ShowcaseGridBlock } from "./showcase-grid";
import { FeaturedCardsListBlock } from "./featured-cards-list-block";
import { SignpostMultipleBlock } from "./signpost-multiple-block";
import { SingleImageBlock } from "./single-image-block";

export type Block = HeroBlock
| FeaturedCardsListBlock
| ThreeColumnGridBlock
| CollageWithTitleBlock
| CollageWithLinkBlock
| ShowcaseGridBlock
| SignpostMultipleBlock
| SingleImageBlock
| FormBlock;
