import qs from 'qs';
import { cmsFetch } from "../http-client";
import { CookieResponse } from '../../../../common/types';

export async function getCookieData({
  locale,
  status,
}: {
  locale: string;
  status: `draft` | `published`;
}) {
  const queryParams = {
    populate: `all`,
    locale: locale === `zh`
      ? `en`
      : locale,
    status,
  };

  const cookieResponse = await cmsFetch<CookieResponse>(`/cookie?${qs.stringify(queryParams)}`);

  return mapCookieResponse(cookieResponse);
}

function mapCookieResponse(response: CookieResponse | null) {
  if (!response?.data) {
    return {
      analyticsText: ``,
      privacyText: ``,
      bannerText: ``,
      webvisorText: ``,
    };
  }

  const {
    data,
  } = response;

  const {
    analyticsText,
    privacyText,
    bannerText,
    webvisorText,
  } = data;

  return {
    analyticsText,
    privacyText,
    bannerText,
    webvisorText,
  };
}
