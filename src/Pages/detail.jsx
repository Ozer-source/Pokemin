import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const Api = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    fetch(Api)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [Api]);

  if (!pokemon) {
    return <p>Error could not find pokemon</p>;
  }

  return (
    <>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <h2>Abilities</h2>
        {pokemon.abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}

      <h2>Types</h2>
        {pokemon.types.map(({ type }) => (
          <li key={type.name}>{type.name}</li>
        ))}

      <a href="/">Home</a><br />
      <a href="/List">List</a>
    </>
  );
}

export default Detail;
