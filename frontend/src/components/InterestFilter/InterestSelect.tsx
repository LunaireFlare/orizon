import { useEffect, useState } from 'react';

import type { Interest } from '../../types/index.d.ts';

type InterestSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InterestSelect({ value, onChange }: InterestSelectProps) {

  const token = localStorage.getItem('token');
  const [ interests, setInterests ] = useState<Interest[]>([]);

  useEffect(() => {
    async function fetchInterests() {
      try {
        const res = await fetch('http://backend.localhost:81/interests', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error('Erreur lors du chargement des données.');
        }
        const data = await res.json();
        setInterests(data);
      } catch (error) {
          console.log('Erreur lors du chargement des données.');
      }            }
            fetchInterests();
  }, [token]);

  return (
    <div>
      <label htmlFor="interet">Centre d’intérêt</label>
      <select
        id="interet"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choisissez un centre d'intérêt --</option>
        {interests.map((interest) => (
          <option key={interest.id} value={interest.name}>
            {interest.name}
          </option>
        ))}
      </select>
    </div>
  );
}
