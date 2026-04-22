import { useRouter } from "next/router";
import Image from 'next/image';
import MockupImage from '../../../public/images/chelzoo-mockup.jpg';
import MockupImageEng from '../../../public/images/chelzoo-mockup-eng.jpg';

export function ChelzooMockup() {
  const {
    locale,
  } = useRouter();

  return (
    <section
      className="chelzoo-mockup"
      data-testid="chelzoo-mockup"
    >
      <div className="chelzoo-mockup__wrapper">
        <Image
          className="chelzoo-mockup__image"
          src={locale === `ru` ? MockupImage : MockupImageEng}
          fill
          alt=""
        />
      </div>
    </section>
  );
}
