import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddCampaignCharacter() {
  const { id } = useRouter().query;
  const [characterId, setCharacterId] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        campaignId: id,
        characterId,
      });
      await fetch('/api/story/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      setCharacterId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submit}>
      <br />
      <p>
        <label>Add Character:</label>
        <input
          onChange={e => setCharacterId(e.target.value)}
          placeholder="Character Id"
          type="text"
          value={characterId}
        />
        <br />
        <input disabled={!characterId} type="submit" value="Add" />
      </p>
    </form>
  );
}
