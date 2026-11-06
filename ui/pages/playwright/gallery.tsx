import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import * as HeaderRedesign from '../../components/redesign/HeaderRedesign/HeaderRedesign';
import * as ChelzooAdaptationStory from '../../components/chelzoo/ChelzooAdaptation/ChelzooAdaptation.stories';

const componentsRegistry: Record<string, React.ComponentType<any>> = {
  ...HeaderRedesign,
  ...ChelzooAdaptationStory,
};

export default function GalleryPage() {
  const [TestedComponent, setTestedComponent] = useState<React.ComponentType<any> | null>(null);
  const [props, setProps] = useState<any>({});

  useEffect(() => {
    (window as any).mount = async ({
      story,
      props: newProps,
    }: {
      story: string;
      props?: any;
    }) => {
      const Component = componentsRegistry[story];

      if (!Component) {
        throw new Error(`Component not found: "${story}". Available: ${Object.keys(componentsRegistry)
          .join(`, `)}`);
      }

      setTestedComponent(() => Component);
      setProps(newProps || {});

      return document.getElementById(`root`);
    };

    (window as any).unmount = () => {
      setTestedComponent(null);
      setProps({});
    };
  }, []);

  return (
    <div id="root">
      {TestedComponent && (
        <TestedComponent
          {...props}
        />
      )}
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
