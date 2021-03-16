export default class Character {
  constructor(name, species, abilities, knacks, items, currentHealth) {
    this.name = name;
    this.species = species;
    this.abilities = abilities;
    this.knacks = knacks;
    this.items = items;
    this.currentHealth =
      currentHealth === null ? this.getHealth() : currentHealth;
  }

  getLevel() {
    return Math.ceil(this.knacks.length / 3);
  }

  getHealth() {
    return 6;
  }

  getDefense() {
    return 6;
  }
}
