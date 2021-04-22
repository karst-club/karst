import { useState } from 'react';
import generateCharacter from '../lib/characterGenerator';
import Character from './Character';

export default function NewCharacter() {
  const [character, setCharacter] = useState(generateCharacter());

  const regenerate = e => {
    e.preventDefault();
    setCharacter(generateCharacter());
  };

  const submit = async e => {
    e.preventDefault();
    try {
      const body = JSON.stringify(character);
      await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submit}>
      <h3 style={{ color: '#851a12' }}>Someone New?</h3>
      <Character character={character} />
      <input type="submit" value="Keep Them" />
      <button onClick={regenerate}>Someone Else</button>
    </form>
  );
}
