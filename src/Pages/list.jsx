import './Css/list.css';
import { useState, useEffect } from 'react';
import { addToTeam, ViewTeam, getTeams, createTeam } from '../Components/TeamManager';

function List() {
    const [gameVersion, setGameVersion] = useState('kanto');
    const [Title, setTitle] = useState('Kanto');
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    // Teams
    const [teams, setTeams] = useState(getTeams());
    const [newTeamName, setNewTeamName] = useState('');

    // Favorieten
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites')) || []
    );
    const [showFavorites, setShowFavorites] = useState(false);

    // Fetch Pokémon data
    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokedex/${gameVersion}`)
            .then(res => res.json())
            .then(data => {
                setPokemons(data.pokemon_entries);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setPokemons([]);
                setLoading(false);
            });
    }, [gameVersion]);

    // Game versie veranderen
    function handleVersionChange(version, titleText) {
        setGameVersion(version);
        setTitle(titleText);
    }

    // Maak nieuw team
    function handleCreateTeam() {
        const name = newTeamName.trim();
        if (name.length < 1) {
            alert("Team naam is te kort!");
            return;
        }
        if (name.length > 15) {
            alert("Team naam is te lang! Max 15 tekens.");
            return;
        }
        createTeam(name, teams, setTeams);
        setNewTeamName('');
    }

    // Toggle favoriet
    function toggleFavorite(id) {
        let updated;
        if (favorites.includes(id)) {
            updated = favorites.filter(f => f !== id);
        } else {
            updated = [...favorites, id];
        }
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    }

    // Filter Pokémon op favorieten
    const displayedPokemons = showFavorites
        ? pokemons.filter(p => {
            const id = Number(p.pokemon_species.url.split('/').filter(Boolean).pop());
            return favorites.includes(id);
        })
        : pokemons;

    return (
        <div className="container content-center">
            <h1>Pokémons from {Title}</h1>

            <details className='Details col-12 col-sm-6 col-md-4 col-lg-5 mb-4'>
                <summary>Select Game Version</summary>
                <button className='Button' onClick={() => handleVersionChange('kanto', 'Kanto')}>Kanto</button>
                <button className='Button' onClick={() => handleVersionChange('updated-johto', 'Johto')}>Johto</button>
                <button className='Button' onClick={() => handleVersionChange('hoenn', 'Hoenn')}>Hoenn</button>
                <button className='Button' onClick={() => handleVersionChange('kalos-central', 'Kalos Central')}>Kalos Central</button>
                <button className='Button' onClick={() => handleVersionChange('kalos-coastal', 'Kalos Coastal')}>Kalos Coastal</button>
                <button className='Button' onClick={() => handleVersionChange('kalos-mountain', 'Kalos Mountain')}>Kalos Mountain</button>
                <button className='Button' onClick={() => handleVersionChange('galar', 'Galar')}>Galar</button>
            </details>

            {/* Nieuwe team input */}
            <div className='TeamDiv'>
                <input
                    type="text"
                    placeholder="Nieuwe team naam"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className='Button'
                    minLength={1}
                    maxLength={15}
                />
                <button className='Button' onClick={handleCreateTeam}>Maak Team</button>
            </div>

            {/* Filter favorieten */}
            <div style={{ marginBottom: '20px' }}>
                <button className='Button' onClick={() => setShowFavorites(!showFavorites)}>
                    {showFavorites ? 'Toon Alle Pokémon' : 'Toon Favorieten'}
                </button>
            </div>

            {/* Teams */}
            <div>
                <h2>Your Teams:</h2>
                <ViewTeam teams={teams} setTeams={setTeams} />
            </div>

            {/* Pokémon grid */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row">
                    {displayedPokemons.map((p) => {
                        const name = p.pokemon_species.name;
                        const url = p.pokemon_species.url;
                        const id = Number(url.split('/').filter(Boolean).pop());
                        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                        return (
                            <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                                <div className="box text-center">
                                    <div className="ImgBox" style={{ position: 'relative' }}>
                                        <img className="img img-fluid" src={imageUrl} alt={name} />
                                        <button
                                            className={`FavoButton ${favorites.includes(id) ? 'active' : 'inactive'}`}
                                            onClick={() => toggleFavorite(id)}
                                        >
                                            ★
                                        </button>
                                    </div>
                                    <a href={`/Details/${id}`} className="d-block PokeButton mb-2">{name}</a>

                                    {/* Knoppen voor elk team */}
                                    {teams.map((team, teamIndex) => (
                                        <button
                                            key={teamIndex}
                                            className='Button'
                                            onClick={() => addToTeam(id, teamIndex, teams, setTeams)}
                                        >
                                            ★ {team.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default List;
