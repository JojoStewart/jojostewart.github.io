export const shuffleMusicals = (
  listOfMusicals: { name: string; emojis: string[] }[]
) => {
  return listOfMusicals
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
