export async function fetchMetadata(id, locale) {
  const response = await fetch(`https://raw.githubusercontent.com/TourmalineCore/TourmalineCore.Articles/master/articles/${locale}/${id.split(`.`)[0]}/metadata.json`);

  const metadata = await response.json();

  return metadata;
}
