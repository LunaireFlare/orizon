import React from 'react';

type InterestSelectProps = {
  value: string;
  onChange: (value: string) => void;
  interests?: string[];
};

export default function InterestSelect({ value, onChange, interests }: InterestSelectProps) {

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
