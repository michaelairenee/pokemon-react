export const capitalization = (name: string) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getPokemonId = (url: string) => {
  const lastIndex = url.lastIndexOf("/");
  const secondLastIndex = url.lastIndexOf("/", lastIndex - 1);
  return url.slice(secondLastIndex + 1, lastIndex);
};
