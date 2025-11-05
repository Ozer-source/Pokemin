import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Css/Detail.css';

function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const Api = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    fetch(Api)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [Api]);

  if (!pokemon) return <p className="loading">Loading Pokémon details...</p>;

  return (
    <div className="detail-container">
      <h1 className="pokemon-name">{pokemon.name}</h1>

      {/* Sprites */}
      <h3>Sprites</h3>
      <div className="sprites-container">
        {Object.entries(pokemon.sprites)
          .filter(([key, value]) => value && typeof value === 'string')
          .map(([key, url]) => (
            <div key={key} className="sprite-item">
              <img src={url} alt={key} className="sprite-img" />
              <p className="sprite-label">{key.replace('_', ' ')}</p>
            </div>
          ))}
      </div>

      {/* Basic Info */}
      <h2>Basic Info</h2>
      <ul className="info-list">
        <li>Height: {pokemon.height / 10} m</li>
        <li>Weight: {pokemon.weight / 10} kg</li>
        <li>Base Experience: {pokemon.base_experience}</li>
      </ul>

      {/* Types */}
      <h2>Types</h2>
      <ul className="info-list">
        {pokemon.types.map(({ type }) => (
          <li key={type.name}>{type.name}</li>
        ))}
      </ul>

      {/* Abilities */}
      <h2>Abilities</h2>
      <ul className="info-list">
        {pokemon.abilities.map(({ ability, is_hidden }) => (
          <li key={ability.name}>
            {ability.name} {is_hidden ? '(Hidden)' : ''}
          </li>
        ))}
      </ul>

      {/* Stats */}
      <h2>Stats</h2>
      <ul className="info-list">
        {pokemon.stats.map(({ stat, base_stat }) => (
          <li key={stat.name}>
            {stat.name}: {base_stat}
          </li>
        ))}
      </ul>

      {/* Moves */}
      <h2>Moves</h2>
      <div className="moves-container">
        <ul className="moveslist">
          {pokemon.moves.map(({ move }) => (
            <li key={move.name}>{move.name}</li>
          ))}
        </ul>
      </div>

      <div className="links">
        <Link to="/">Home</Link> | <Link to="/List">List</Link>
      </div>
    </div>
  );
}

export default Detail;
