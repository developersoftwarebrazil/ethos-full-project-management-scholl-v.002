export const normalizeUsername = (firstName: string, lastName: string) => {
  const normalize = (str: string) =>
    str
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/\s+/g, ".") // troca espaços por ponto
      .replace(/[^a-zA-Z0-9.@+_-]/g, "") // remove chars inválidos
      .toLowerCase();

  return `${normalize(firstName)}.${normalize(lastName)}@user.com`;
};
