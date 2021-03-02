import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import CharacterDisplay from '../../components/RulesetDisplay/CharacterDisplay';
import KnackDisplay from '../../components/RulesetDisplay/KnackDisplay';
import SpeciesAbilityDisplay from '../RulesetDisplay/SpeciesAbilityDisplay';
import generate from '../../utils/rules/characterGenerator';
import {
  addCharacter,
  deleteCharacter,
  getCharacters,
} from '../../utils/stores/characterStore';

// generate a character, stuff it in list
// show list with Xs with the index

class CharacterGeneratorPage extends React.Component {
  constructor(props: PageProps) {
    super(props);
    this.state = { characters: getCharacters() };
  }

  addChar() {
    addCharacter();
    this.setState({ characters: getCharacters() });
  }

  deleteChar(i) {
    deleteCharacter(i);
    this.setState({ characters: getCharacters() });
  }

  render() {
    const characters = this.state.characters.map((c, i) => (
      <li key={i}>
        <CharacterDisplay character={c} />
        <span onClick={() => this.deleteChar(i)}>X</span>
      </li>
    ));
    return (
      <>
        <h1>A Cast of Characters</h1>
        <button onClick={() => this.addChar()}>Add Character</button>
        <ul>{characters}</ul>
      </>
    );
  }
}

export default CharacterGeneratorPage;
