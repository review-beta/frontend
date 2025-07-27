import React, { useState } from 'react';
import API from '../../utils/api'

const CastForm = () => {
  const [name, setName] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await API.post('/cast/', { name: name });
    alert('Cast added successfully!');
    setName('');
  } catch (err) {
    console.error(err);
    alert('Failed to add cast');
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-1">Cast Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </label>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Cast
      </button>
    </form>
  );
};

export default CastForm;
