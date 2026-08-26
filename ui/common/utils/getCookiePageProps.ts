import { getCookieData } from "../../services/cms/api/cookie-api/cookie-api";
import { loadTranslations } from "./loadTranslations";

export async function getCookiePageProps({
  locale,
  preview = false,
}: {
  locale: string;
  preview: boolean;
}) {
  const translations = await loadTranslations(locale, [`cookie`, `cookieSettings`]);

  const cmsResponse = process.env.IS_STATIC_MODE === `true`
    ? null
    : await getCookieData({
      status: preview ? `draft` : `published`,
      locale,
    })
      .catch(() => null);

  return {
    cookieData: {
      acceptButtonText: translations.cookie.accept,
      rejectButtonText: translations.cookie.reject,
      settingsButtonText: translations.cookie.settings,
      bannerText: cmsResponse?.bannerText || translations.cookie.text,
    },
    cookieSettingsData: {
      ...translations.cookieSettings,
      analytics: {
        title: translations.cookieSettings.analytics.title,
        text: cmsResponse?.analyticsText || translations.cookieSettings.analytics.text,
      },
      webvisor: {
        title: translations.cookieSettings.webvisor.title,
        text: cmsResponse?.webvisorText || translations.cookieSettings.webvisor.text,
      },
      note: cmsResponse?.privacyText || translations.cookieSettings.note,
    },
  };
}
