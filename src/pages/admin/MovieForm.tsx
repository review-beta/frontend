import React, { useState, useEffect } from 'react';
import API from '../../utils/api'
import dayjs from 'dayjs';

interface Genre { id: number; name: string; }
interface Director { id: number; name: string; }
interface CastMember { id: number; name: string; }

type MovieFormData = {
  title: string;
  description: string;
  poster_url: string | File;
  trailer_url: string;
  release_date: string;
  duration: string;
  language: string;
  country: string;
  is_featured: boolean;
  movie_type: string;
  age_rating: string;
  genre: number[];
  cast: number[];
  director: number[];
};

const MovieForm = () => {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    description: '',
    poster_url: '', // default to empty string
    trailer_url: '',
    release_date: '',
    duration: '',
    language: '',
    country: '',
    is_featured: false,
    movie_type: 'Cinema',
    age_rating: 'G',
    genre: [],
    cast: [],
    director: [],
  });

  const [genres, setGenres] = useState<Genre[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [castMembers, setCastMembers] = useState<CastMember[]>([]);

  // Fetch supporting data
  useEffect(() => {
    API.get('/genres/').then(res => setGenres(res.data));
    API.get('/directors/').then(res => setDirectors(res.data));
    API.get('/cast/').then(res => setCastMembers(res.data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked; // only relevant for checkboxes

    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
    }));
    };

const handleMultiSelect = (name: string, value: number) => {
    const current = formData[name as keyof typeof formData] as number[];

    const updated = current.includes(value)
        ? current.filter((v: number) => v !== value)
        : [...current, value];

    setFormData(prev => ({
        ...prev,
        [name]: updated,
    }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setFormData(prev => ({
        ...prev,
        poster_url: file,
        }));
    }
    };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = new FormData();
  form.append('title', formData.title);
  form.append('description', formData.description);
  form.append('poster_url', formData.poster_url); // must be File object
  form.append('trailer_url', formData.trailer_url);
    form.append('release_date', dayjs(formData.release_date).format('YYYY-MM-DD'));
  form.append('duration', formData.duration);
  form.append('language', formData.language);
  form.append('country', formData.country);
  form.append('is_featured', String(formData.is_featured));
  form.append('movie_type', formData.movie_type);
  form.append('age_rating', formData.age_rating);

  // For many-to-many fields (genre, director, cast), append each value
  formData.genre.forEach(id => form.append('genre', String(id)));
  formData.director.forEach(id => form.append('director', String(id)));
  formData.cast.forEach(id => form.append('cast', String(id)));

  try {
    await API.post('/movies/', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    alert('Movie uploaded successfully!');
    // Reset form
    setFormData({
      title: '',
      description: '',
      poster_url: '' as any,
      trailer_url: '',
      release_date: '',
      duration: '',
      language: '',
      country: '',
      is_featured: false,
      movie_type: 'Cinema',
      age_rating: 'G',
      genre: [],
      cast: [],
      director: [],
    });
  } catch (err: any) {
  if (err.response) {
    console.error("Backend Error:", err.response.data);
    alert(JSON.stringify(err.response.data, null, 2));
  } else {
    console.error(err);
    alert('Something went wrong!');
  }
}};


  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Upload Movie</h2>

    <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
        </label>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
    </div>

      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
      <div className="mb-4">
        <label htmlFor="poster_url" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Poster
        </label>
        <input
            type="file"
            name="poster_url"
            id="poster_url"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
        />
        </div>
      <input name="trailer_url" value={formData.trailer_url} onChange={handleChange} placeholder="Trailer URL" className="w-full border p-2 rounded" />

      <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (mins)" className="w-full border p-2 rounded" required />

      <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="w-full border p-2 rounded" />
      <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full border p-2 rounded" />

      <div className="mb-4">
        <label htmlFor="directors" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
        </label>
      <select
        name="genre"
        multiple
        value={formData.genre.map(String)}
        onChange={(e) => {
            const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));
            setFormData(prev => ({ ...prev, genre: selectedValues }));
        }}
        className="w-full border border-gray-300 rounded px-3 py-2"
        >
        {genres.map(g => (
            <option key={g.id} value={g.id}>
            {g.name}
            </option>
        ))}
        </select>
        </div>

        <div className="mb-4">
        <label htmlFor="directors" className="block text-sm font-medium text-gray-700 mb-1">
            Cast
        </label>
        <select
        name="cast"
        multiple
        value={formData.cast.map(String)}
        onChange={(e) => {
            const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));
            setFormData(prev => ({ ...prev, cast: selectedValues }));
        }}
        className="w-full border border-gray-300 rounded px-3 py-2"
        >
        {castMembers.map(c => (
            <option key={c.id} value={c.id}>
            {c.name}
            </option>
        ))}
        </select>
        </div>

        <div className="mb-4">
        <label htmlFor="directors" className="block text-sm font-medium text-gray-700 mb-1">
            Director
        </label>
        <select
        name="director"
        multiple
        value={formData.director.map(String)}
        onChange={(e) => {
            const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));
            setFormData(prev => ({ ...prev, director: selectedValues }));
        }}
        className="w-full border border-gray-300 rounded px-3 py-2"
        >
        {directors.map(d => (
            <option key={d.id} value={d.id}>
            {d.name}
            </option>
        ))}
        </select>
        </div>


      <select name="movie_type" value={formData.movie_type} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="Cinema">Cinema</option>
        <option value="TV Series">TV Series</option>
        <option value="Streaming">Streaming</option>
      </select>

      <select name="age_rating" value={formData.age_rating} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="18+">18+</option>
      </select>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
        Featured Movie?
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload Movie
      </button>
    </form>
  );
};

export default MovieForm;