export async function fetchArticle(id, locale) {
  const response = await fetch(`https://raw.githubusercontent.com/TourmalineCore/TourmalineCore.Articles/master/articles/${locale}/${id.split(`.`)[0]}/${id}`);

  const article = await response.text();

  return article;
}
