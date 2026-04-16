import { useRouter } from "next/router";
import Image from 'next/image';
import Mockup from '../../../public/images/chelzoo-mockup.jpg';
import MockupEng from '../../../public/images/chelzoo-mockup-eng.jpg';

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
          src={locale === `ru` ? Mockup : MockupEng}
          fill
          placeholder="blur"
          alt=""
        />
      </div>
    </section>
  );
}
