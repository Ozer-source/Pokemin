import { useState, useEffect, use } from 'react';

function List() {
    // state for selected game version / pokedex id
    const [gameVersion, setGameVersion] = useState('kanto');
    const [Title, setTitle] = useState('Kanto')
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokedex/${gameVersion}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setPokemons(data.pokemon_entries);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setPokemons([]);
                setLoading(false);
            });
    }, [gameVersion]); // refetch when gameVersion changes

    function handleVersionChange(version, titleText) {
        setGameVersion(version);
        setTitle(titleText);
    }

    return (
        <div>
            <h1>Pokémons from {Title}</h1>
            <details>
                <summary>Select Game Version</summary>
                <button onClick={() => handleVersionChange('kanto','kanto')}>Kanto</button>
                <button onClick={() => handleVersionChange('updated-johto', 'johto')}>Johto</button>
                <button onClick={() => handleVersionChange('hoenn', 'hoenn')}>Hoenn</button>
                <button onClick={() => handleVersionChange('kalos-central', 'kalos-central')}>Kalos Central</button>
                <button onClick={() => handleVersionChange('kalos-coastal', 'kalos-coastal')}>Kalos Coastal</button>
                <button onClick={() => handleVersionChange('kalos-mountain', 'kalos-mountain')}>Kalos Mountain</button>
                <button onClick={() => handleVersionChange('galar', 'galar')}>Galar</button>
            </details>
            <ul>
                {loading ? (
                    <li>Loading...</li>
                ) : pokemons.length > 0 ? (
                    pokemons.map((p) => {
                        const name = p.pokemon_species.name;
                        const url = p.pokemon_species.url;
                        const id = url.split('/').filter(Boolean).pop();
                        return (
                            <li key={id}>
                                <a href={`/Details/${id}`}>{name}</a>
                            </li>
                        );
                    })
                ) : (
                    <li>No Pokémon found.</li>
                )}
            </ul>
        </div>
    );
}

export default List;
