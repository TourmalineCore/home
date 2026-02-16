export async function fetchArticlesList() {
  const response = await fetch(`https://api.github.com/repos/TourmalineCore/TourmalineCore.Articles/git/trees/master?recursive=true`);
  const articles = await response.json();

  return getAdaptedArticles(listToTree(articles.tree));
}

function getAdaptedArticles(tree = []) {
  const articlesFolder = tree.find((item) => item.name === `articles`);

  if (!articlesFolder || !articlesFolder.children) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return Object.fromEntries(
    articlesFolder.children.map((localeFolder) => [localeFolder.name, localeFolder.children]),
  );
}

const filterDraftFiles = (list) => list.filter((listItem) => !listItem.path.includes(`[draft]`));

function listToTree(list) {
  const result = [];
  const level = {
    result,
  };

  filterDraftFiles(list)
    .forEach((item) => {
      item.path.split(`/`)
        .reduce((acc, name) => {
          if (!acc[name]) {
            acc[name] = {
              result: [],
            };
            acc.result.push({
              name,
              children: acc[name].result,
            });
          }

          return acc[name];
        }, level);
    });

  return result;
}
