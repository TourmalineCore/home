import path from "path";
import fs from 'fs';
import { DEFAULT_LOCALE } from "../constants";

export async function loadTranslations<T extends string>(locale: string, namespaces: T[]): Promise<Record<T, any>> {
  const translationPromises = namespaces.map(async (namespace) => {
    try {
      const filePath = path.join(process.cwd(), `public`, `locales`, locale === `zh` ? DEFAULT_LOCALE : locale, `${namespace}.json`);
      const fileContent = await fs.promises.readFile(filePath, `utf-8`);
      return {
        namespace,
        translations: JSON.parse(fileContent),
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error loading translations for ${namespace}:`, error);
      return null;
    }
  });

  const results = await Promise.all(translationPromises);

  return results.reduce((acc, result) => {
    if (result !== null) {
      acc[result.namespace] = result.translations;
    }
    return acc;
  }, {} as Record<T, any>);
}
