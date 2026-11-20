import { useNonBreakingSpaces } from "../../../common/hooks";
import { ChelzooAdaptation } from "./ChelzooAdaptation";

export function ChelzooAdaptationStory() {
  useNonBreakingSpaces({
    locale: `ru`,
  });

  return (
    <ChelzooAdaptation />
  );
}
