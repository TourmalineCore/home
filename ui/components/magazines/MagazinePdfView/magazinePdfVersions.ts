export type MagazinePdfVersionId = 'teaser' | 'full';

export type MagazinePdfVersion = {
  id: MagazinePdfVersionId;
  label: string;
  pagesCount: number;
  filePath: string;
};

export const MAGAZINE_PDF_VERSIONS: MagazinePdfVersion[] = [
  {
    id: `teaser`,
    label: `Тизер`,
    pagesCount: 20,
    filePath: `/documents/magazines/tourmaline-code-001-tdd-teaser.pdf`,
  },
  {
    id: `full`,
    label: `Полная версия`,
    pagesCount: 40,
    filePath: `/documents/magazines/tourmaline-code-001-tdd-full.pdf`,
  },
];

export const DEFAULT_MAGAZINE_PDF_VERSION_ID: MagazinePdfVersionId = `full`;

export function getMagazinePdfVersion(versionId: MagazinePdfVersionId) {
  return MAGAZINE_PDF_VERSIONS.find((version) => version.id === versionId)!;
}

export function resolveMagazinePdfVersionIdFromQuery(rawValue: string | string[] | undefined) {
  if (rawValue === `teaser`) {
    return {
      versionId: `teaser` as const,
      isInvalid: false,
    };
  }

  if (rawValue === DEFAULT_MAGAZINE_PDF_VERSION_ID || rawValue === undefined) {
    return {
      versionId: DEFAULT_MAGAZINE_PDF_VERSION_ID,
      isInvalid: false,
    };
  }

  return {
    versionId: DEFAULT_MAGAZINE_PDF_VERSION_ID,
    isInvalid: true,
  };
}
