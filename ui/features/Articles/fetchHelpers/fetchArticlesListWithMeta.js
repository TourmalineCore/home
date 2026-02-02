import { fetchArticlesList } from './fetchArticlesList';
import { fetchMetadata } from './fetchMetadata';

export async function fetchArticlesListWithMeta() {
  const articlesList = await fetchArticlesList();

  const flattenedArticleFolders = Object.entries(articlesList)
    .reduce((acc, [locale, list]) => {
      list.forEach((articleFolder) => {
        acc.push({
          ...articleFolder,
          locale,
        });
      });

      return acc;
    }, []);

  const currentArticles = await Promise.all(flattenedArticleFolders.map(async (articleFolder) => {
    const files = articleFolder.children;
    const articleFilename = files.filter((file) => file.name.indexOf(`.md`) !== -1)[0].name;

    const metadata = await fetchMetadata(articleFilename, articleFolder.locale);

    return {
      ...articleFolder,
      metadata,
    };
  }));

  return currentArticles;
}
