import IconRussianFlag from '../../icons/flag-for-russia.svg';
import IconUSAFlag from '../../icons/flag-for-united-states.svg';
import IconChinaFlag from '../../icons/flag-for-china.svg';

type Languages = {
  [key: string]: {
    name: string;
    shortName: string;
    icon: () => JSX.Element;
  };
};

export const DEFAULT_LOCALE = `en`;

export const languages: Languages = {
  en: {
    name: `English`,
    shortName: `en`,
    icon: () => <IconUSAFlag className="lang-switch__flag" />,
  },
  ru: {
    name: `Русский`,
    shortName: `рус`,
    icon: () => <IconRussianFlag className="lang-switch__flag" />,
  },
  zh: {
    name: `中文`,
    shortName: `中文`,
    icon: () => <IconChinaFlag className="lang-switch__flag" />,
  },
};
