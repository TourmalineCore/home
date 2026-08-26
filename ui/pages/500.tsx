import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useRouter } from 'next/router';
import { CustomError } from '../components/CustomError/CustomError';
import { getCookiePageProps } from '../common/utils/getCookiePageProps';

export default function Custom500() {
  const {
    locale,
  } = useRouter();

  return (
    <CustomError
      statusCode={500}
      message={
        locale === `ru`
          ? `Извините, произошла внутренняя ошибка сервера. Попробуйте зайти позже.`
          : `Sorry, there was an internal server error. Try to come back later.`
      }
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
