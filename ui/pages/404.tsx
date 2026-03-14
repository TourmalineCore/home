import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { GetServerSideProps } from 'next';
import { CustomError } from '../components/CustomError/CustomError';

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

export const getStaticProps: GetServerSideProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [`pageNotFound`, `cookie`])),
  },
});
