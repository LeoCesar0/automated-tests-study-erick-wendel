export const makePerson = (string) => {
  const { name, age } = JSON.parse(string);
  return {
    name,
    age,
    createdAt: new Date(),
  };
};
