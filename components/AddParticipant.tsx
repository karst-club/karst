import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddParticipant() {
  const { id } = useRouter().query;
  const [email, setEmail] = useState('');

  const submitData = async e => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        campaignId: id,
        email,
      });
      await fetch('/api/story/participant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      setEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitData}>
      <br />
      <p>
        <label>Invite Author:</label>
        <br />
        <input
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          value={email}
        />
        <br />
        <input disabled={!email} type="submit" value="Send Invitation" />
      </p>
    </form>
  );
}
