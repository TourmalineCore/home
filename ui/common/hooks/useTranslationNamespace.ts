import { useTranslation } from 'next-i18next';
import { usePath } from './usePath';

export function useTranslationNamespace(block: string) {
  const {
    slicePathname,
  } = usePath();
  const translation = useTranslation(`${block}${slicePathname[0].toUpperCase() + slicePathname.slice(1)}`);

  return translation;
}
