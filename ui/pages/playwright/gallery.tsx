import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import * as HeaderRedesign from '../../components/redesign/HeaderRedesign/HeaderRedesign';
import * as ChelzooAdaptationStories from '../../components/chelzoo/ChelzooAdaptation/ChelzooAdaptation.stories';

const storiesRegistry: Record<string, React.ComponentType<any>> = {
  ...HeaderRedesign,
  ...ChelzooAdaptationStories,
};

export default function GalleryPage() {
  const [StoryComponent, setStoryComponent] = useState<React.ComponentType<any> | null>(null);
  const [props, setProps] = useState<any>({});

  useEffect(() => {
    (window as any).mount = async ({
      story,
      props: newProps,
    }: {
      story: string;
      props?: any;
    }) => {
      const Component = storiesRegistry[story];

      if (!Component) {
        throw new Error(`Story not found: "${story}". Available: ${Object.keys(storiesRegistry)
          .join(`, `)}`);
      }

      setStoryComponent(() => Component);
      setProps(newProps || {});

      return document.getElementById(`root`);
    };

    (window as any).unmount = () => {
      setStoryComponent(null);
      setProps({});
    };
  }, []);

  return (
    <div id="root">
      {StoryComponent && <StoryComponent {...props} />}
    </div>
  );
}

GalleryPage.getLayout = (page: React.ReactElement) => page;

export async function getStaticProps({
  locale,
}: {
  locale: string;
}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [`chelzooAdaptation`])),
    },
  };
}
