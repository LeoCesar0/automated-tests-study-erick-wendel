import { Service } from "./service";
import { DB_NAME } from "./static";

const runner = (hero) => {
  const service = new Service(DB_NAME);
  const createdHero = service.createHero(hero);

  const heroes = service.listHeroes();

  return createdHero;
};

export { runner };
