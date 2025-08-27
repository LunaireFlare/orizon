import React from 'react';

type InterestSelectProps = {
  value: string;
  onChange: (value: string) => void;
  interests?: string[]; // optionnel si tu veux passer la liste dynamique
};

export default function InterestSelect({ value, onChange, interests }: InterestSelectProps) {
  // Liste par défaut si pas de props.interests fournie
  const defaultInterests = ['Sport', 'Musique', 'Voyage', 'Cuisine'];

  const list = interests && interests.length > 0 ? interests : defaultInterests;

  return (
    <div>
      <label htmlFor="interet">Centre d’intérêt</label>
      <select
        id="interet"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choisissez un centre d'intérêt --</option>
        {list.map((interest) => (
          <option key={interest.toLowerCase()} value={interest.toLowerCase()}>
            {interest}
          </option>
        ))}
      </select>
    </div>
  );
}
