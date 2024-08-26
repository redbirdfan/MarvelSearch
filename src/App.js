import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MarvelCharacterSearch from './MarvelCharacterSearch';
import PokemonCharacterSearch from './PokemonCharacterSearch';
import HomePage from './HomePage';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marvelCharacterSearch" element={<MarvelCharacterSearch />} />
        <Route path="/pokemonSearch" element={<PokemonCharacterSearch />} />
      </Routes>
    </div>
  );
  
}

export default App;
