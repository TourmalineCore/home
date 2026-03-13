import { ReactNode, useRef } from 'react';
import { FooterRedesign } from '../FooterRedesign/FooterRedesign';
import { SkipLink } from '../../SkipLink/SkipLink';
import { HeaderRedesign } from '../HeaderRedesign/HeaderRedesign';
import { FooterRedesignProps, HeaderRedesignProps } from '../../../common/types';
import { ExitPreviewButton } from '../../ExitPreviewButton/ExitPreviewButton';

export function LayoutRedesign({
  children,
  mainClassName,
  headerContent,
  footerContent,
  isPreview,
}: {
  children?: ReactNode;
  mainClassName?: string;
  headerContent: HeaderRedesignProps;
  footerContent: FooterRedesignProps;
  isPreview: boolean;
}) {
  const mainElementRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className="layout-redesign">
      <SkipLink
        mainElementRef={mainElementRef}
      />
      {isPreview && <ExitPreviewButton />}
      <HeaderRedesign
        navigationLists={headerContent.navigationLists}
        buttonLabel={headerContent.buttonLabel}
        emailCaption={headerContent.emailCaption}
        emailAddress={headerContent.emailAddress}
        socialLinks={headerContent.socialLinks}
      />
      <main
        id="main-content"
        ref={mainElementRef}
        className={mainClassName}
      >
        {children}
      </main>
      <FooterRedesign
        emailCaption={footerContent.emailCaption}
        emailAddress={footerContent.emailAddress}
        navigationLists={footerContent.navigationLists}
      />
    </div>
  );
}
