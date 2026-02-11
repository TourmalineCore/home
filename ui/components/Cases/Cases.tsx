import { CasesCard } from './components/CasesCard/CasesCard';
import IconCamera from '../../icons/icon-camera.svg';
import IconPeople from '../../icons/icon-people.svg';
import IconMonitor from '../../icons/icon-monitor.svg';
import IconChart from '../../icons/icon-chart.svg';
import IconHeart from '../../icons/icon-heart.svg';
import IconAdvertisement from '../../icons/icon-advertisement.svg';
import IconIceCream from '../../icons/icon-ice-cream.svg';
import IconWatch from '../../icons/icon-watch.svg';
import IconGear from '../../icons/icon-gear.svg';
import IconVideoCamera from '../../icons/icon-video-camera.svg';
import IconNotepad from '../../icons/icon-notepad.svg';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { useTranslationNamespace } from '../../common/hooks';

const ICONS = {
  camera: <IconCamera />,
  people: <IconPeople />,
  monitor: <IconMonitor />,
  chart: <IconChart />,
  heart: <IconHeart />,
  advertisement: <IconAdvertisement />,
  iceCream: <IconIceCream />,
  watch: <IconWatch />,
  gear: <IconGear />,
  videoCamera: <IconVideoCamera />,
  notepad: <IconNotepad />,
};

type CasesList = {
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  link: string;
}[];

export function Cases() {
  const {
    t,
  } = useTranslationNamespace(`cases`);

  const casesList: CasesList = t(`list`, {
    returnObjects: true,
  });

  return (
    <section
      id={TechnologyPageAnchorLink.Cases}
      className="cases"
    >
      <div className="container cases__wrapper">
        <div className="cases__inner">
          <h2 className="title-technology-type-1 cases__title">{t(`title`)}</h2>
          {casesList.map((item, index) => (
            <CasesCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              title={item.title}
              description={item.description}
              icon={ICONS[item.icon]}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
