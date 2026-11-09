import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { CustomError } from '../components/CustomError/CustomError';
import { getCookiePageProps } from '../common/utils/getCookiePageProps';

export default function Custom404() {
  const {
    t,
  } = useTranslation(`pageNotFound`);

  return (
    <CustomError
      statusCode={404}
      message={t(`message`)}
    />
  );
}

export async function getStaticProps({
  locale,
  preview = false,
}: {
  locale: string;
  preview: boolean;
}) {
  const {
    cookieData,
    cookieSettingsData,
  } = await getCookiePageProps({
    locale,
    preview,
  });

  return {
    props: {
      cookieData,
      cookieSettingsData,
      ...(await serverSideTranslations(locale as string, [`pageNotFound`])),
    },
  };
}
