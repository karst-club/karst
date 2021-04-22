import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateStory() {
  const [title, setTitle] = useState('');

  const submitData = async e => {
    e.preventDefault();
    try {
      const body = JSON.stringify({ title });
      await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitData}>
      <input
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        type="text"
        value={title}
      />
      <input disabled={!title} type="submit" value="Create" />
    </form>
  );
}
