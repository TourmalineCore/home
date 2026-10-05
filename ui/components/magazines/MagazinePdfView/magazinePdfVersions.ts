export type MagazinePdfVersionId = 'teaser' | 'full';

export type MagazinePdfVersion = {
  id: MagazinePdfVersionId;
  pagesCount: number;
  filePath: string;
};

const MAGAZINE_PDF_VERSIONS_BY_LOCALE: Record<string, MagazinePdfVersion[]> = {
  ru: [
    {
      id: `teaser`,
      pagesCount: 20,
      filePath: `/documents/magazines/tourmaline-code-001-tdd-teaser-ru.pdf`,
    },
    {
      id: `full`,
      pagesCount: 40,
      filePath: `/documents/magazines/tourmaline-code-001-tdd-full-ru.pdf`,
    },
  ],
  en: [
    {
      id: `full`,
      pagesCount: 40,
      filePath: `/documents/magazines/tourmaline-code-001-tdd-full-en.pdf`,
    },
  ],
};

const FALLBACK_LOCALE = `en`;

export const DEFAULT_MAGAZINE_PDF_VERSION_ID: MagazinePdfVersionId = `full`;

export function getMagazinePdfVersions({
  locale,
}: {
  locale: string | undefined;
}) {
  return MAGAZINE_PDF_VERSIONS_BY_LOCALE[locale || FALLBACK_LOCALE] || MAGAZINE_PDF_VERSIONS_BY_LOCALE[FALLBACK_LOCALE];
}

export function getMagazinePdfVersion({
  versions,
  versionId,
}: {
  versions: MagazinePdfVersion[];
  versionId: MagazinePdfVersionId;
}) {
  return versions.find((version) => version.id === versionId)!;
}

export function resolveMagazinePdfVersionIdFromQuery({
  rawValue,
  versions,
}: {
  rawValue: string | string[] | undefined;
  versions: MagazinePdfVersion[];
}) {
  if (rawValue === undefined) {
    return {
      versionId: DEFAULT_MAGAZINE_PDF_VERSION_ID,
      isInvalid: false,
    };
  }

  // A version the locale doesn't have (say, the teaser in English) is as invalid as a made-up one
  const version = versions.find(({
    id,
  }) => id === rawValue);

  if (version) {
    return {
      versionId: version.id,
      isInvalid: false,
    };
  }

  return {
    versionId: DEFAULT_MAGAZINE_PDF_VERSION_ID,
    isInvalid: true,
  };
}
