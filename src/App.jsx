import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonList } from './components/PokemonList';
import { Pokedex } from './components/Pokedex';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<Pokedex />} />
      </Routes>
    </Router>
  );
}

export default App;