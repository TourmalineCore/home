/* eslint-disable no-useless-escape */
import { useEffect } from "react";

export function useNonBreakingSpaces({
  locale,
}: {
  locale: string;
}) {
  useEffect(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
    );

    const russianRules = /((?<![^\s\(«'"])(с|со|я|в|во|вы|вне|у|к|ко|но|их|ее|её|на|не|ни|над|по|под|про|при|за|о|от|об|обо|до|для|и|из|им\.|без|а|или|\/\/)(\s+|$))/gi;

    const englishRules = /((?<![^\s\(«"'])(a|an|the|of|in|to|for|with|on|at|by|as|is|be|are|was|were|and|or|but|nor|so|for|yet)(\s+|$))/gi;

    let node;
    // Traversing all nodes
    // eslint-disable-next-line no-cond-assign
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;

      if (text && text !== ``) {
        const newText = text.replace(locale === `ru` ? russianRules : englishRules, `$2\u00a0`);

        // Update the node value if it has changed
        if (newText !== text) {
          node.nodeValue = newText;
        }
      }
    }
  }, [locale]);
}
