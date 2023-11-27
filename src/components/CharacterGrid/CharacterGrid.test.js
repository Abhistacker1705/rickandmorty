import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import CharacterGrid from './CharacterGrid';

describe('CharacterGrid Component', () => {
  const characters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'rick.png',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      image: 'morty.png',
    },
  ];

  test('renders characters grid with links and details', () => {
    const {getByText, getAllByRole} = render(
      <Router>
        <CharacterGrid characters={characters} />
      </Router>
    );

    expect(getByText('Rick Sanchez')).toBeInTheDocument();
    expect(getByText('Morty Smith')).toBeInTheDocument();

    const characterLinks = getAllByRole('link');
    expect(characterLinks).toHaveLength(characters.length);

    characterLinks.forEach((link, index) => {
      expect(link).toHaveAttribute(
        'href',
        `/characters/${characters[index].id}`
      );
    });
  });

  test('renders "Nothing here" message when characters array is empty', () => {
    const {getByText} = render(
      <BrowserRouter>
        <CharacterGrid characters={[]} />
      </BrowserRouter>
    );

    expect(getByText('Nothing here')).toBeInTheDocument();
  });
});
