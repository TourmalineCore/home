import {
  SharedCollageWithTitleComponent,
  SharedFeaturedCardsListComponent,
  SharedHeroComponent,
  SharedSignpostMultipleComponent,
  SharedSingleImageComponent,
  SharedThreeColumnGridComponent,
  SharedCollageWithLinkComponent,
  SharedShowcaseGridComponent,
} from "../api-types";

export type BlockApi = SharedHeroComponent
| SharedFeaturedCardsListComponent
| SharedCollageWithTitleComponent
| SharedSignpostMultipleComponent
| SharedSingleImageComponent
| SharedThreeColumnGridComponent
| SharedCollageWithLinkComponent
| SharedShowcaseGridComponent;
