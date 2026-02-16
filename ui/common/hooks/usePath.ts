import { useRouter } from 'next/router';

export function usePath() {
  const {
    pathname,
  } = useRouter();

  return {
    pathname,
    slicePathname: pathname.slice(1),
  };
}
