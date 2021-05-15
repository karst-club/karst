import { useState } from 'react';
import { useRouter } from 'next/router';
import SidebarLayout from '../../../components/SidebarLayout';

export default function Write() {
  const { id } = useRouter().query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async e => {
    e.preventDefault();
    try {
      // TODO pass in campaign
      const body = JSON.stringify({
        campaignId: id,
        title,
        content,
      });
      await fetch('/api/chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SidebarLayout sidebar={'TODO'}>
      <form onSubmit={submitData}>
        <h1>Write</h1>
        <input
          onChange={e => setTitle(e.target.value)}
          placeholder="Chapter Title"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          rows={8}
          onChange={e => setContent(e.target.value)}
          value={content}
        />
        <input disabled={!content || !title} type="submit" value="Publish" />
      </form>
    </SidebarLayout>
  );
}
