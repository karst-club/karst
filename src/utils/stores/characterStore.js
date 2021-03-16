import generateCharacter from '../rules/characterGenerator';
import Character from '../rules/Character';

const isBrowser = () => typeof window !== 'undefined';

const loadCharacters = () => {
  if (isBrowser()) {
    const loaded =
      JSON.parse(window.localStorage.getItem('characterList')) || [];
    return loaded.map(
      ({ name, species, abilities, knacks, items, currentHealth }) =>
        new Character(name, species, abilities, knacks, items, currentHealth)
    );
  } else return [];
};

const store = {
  characters: loadCharacters(),
};

const saveCharacters = () => {
  if (isBrowser()) {
    window.localStorage.setItem(
      'characterList',
      JSON.stringify(store.characters)
    );
  }
};

export const getCharacters = () => store.characters;

export const addCharacter = () => {
  store.characters = [generateCharacter(), ...store.characters];
  saveCharacters();
};

export const deleteCharacter = i => {
  store.characters.splice(i, 1);
  saveCharacters();
};
