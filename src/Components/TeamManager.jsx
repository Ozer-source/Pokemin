import React from 'react';
import '../Pages/Css/TeamManager.css';

// Haal teams op uit localStorage of maak een lege array
export function getTeams() {
    const stored = localStorage.getItem('teams');
    try {
        const parsed = stored ? JSON.parse(stored) : [];
        // fallback: elk team moet {name, pokemons} bevatten
        return parsed.map(team => ({
            name: team.name || 'Team',
            pokemons: Array.isArray(team.pokemons) ? team.pokemons : []
        }));
    } catch (e) {
        return []; // fallback als JSON corrupt is
    }
}


// Sla alle teams op
export function saveTeams(teams) {
    localStorage.setItem('teams', JSON.stringify(teams));
}

// Voeg een Pokémon toe aan een team
export function addToTeam(pokemonId, teamIndex, teams, setTeams) {
    const id = Number(pokemonId);
    const updatedTeams = [...teams];
    const team = updatedTeams[teamIndex];

    if (team.pokemons.includes(id)) {
        alert(`Pokémon zit al in ${team.name}!`);
        return;
    }
    if (team.pokemons.length >= 6) {
        alert(`${team.name} is vol (max 6)!`);
        return;
    }

    team.pokemons.push(id);
    setTeams(updatedTeams);
    saveTeams(updatedTeams);
}

// Verwijder een Pokémon uit een team
export function removeFromTeam(pokemonId, teamIndex, teams, setTeams) {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].pokemons = updatedTeams[teamIndex].pokemons.filter(p => p !== Number(pokemonId));
    setTeams(updatedTeams);
    saveTeams(updatedTeams);
}

// Voeg een nieuw team toe
export function createTeam(teamName, teams, setTeams) {
    const updatedTeams = [...teams, { name: teamName, pokemons: [] }];
    setTeams(updatedTeams);
    saveTeams(updatedTeams);
}

// Verwijder een heel team
export function deleteTeam(teamIndex, teams, setTeams) {
    const updatedTeams = teams.filter((_, idx) => idx !== teamIndex);
    setTeams(updatedTeams);
    saveTeams(updatedTeams);
}

// Component om alle teams te tonen
export function ViewTeam({ teams, setTeams }) {
    return (
        <div>
            {teams.map((team, index) => (
                <div key={index}>
                    <h4>
                        {team.name}{' '}
                        <button
                            onClick={() => deleteTeam(index, teams, setTeams)}
                            className='DeleteButton'
                        >
                            Verwijder Team
                        </button>
                    </h4>
                    {team.pokemons.length === 0 ? (
                        <p>Geen Pokémon in dit team.</p>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {team.pokemons.map((id, idx) => {
                                const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                                return (
                                    <div key={`${id}-${idx}`} style={{ position: 'relative' }}>
                                        <img
                                            src={spriteUrl}
                                            alt={`Pokémon ID: ${id}`}
                                            style={{ width: '70px', cursor: 'pointer' }}
                                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/70?text=?'; }}
                                        />
                                        <button
                                            onClick={() => removeFromTeam(id, index, teams, setTeams)}
                                            className='RemoveButton'
                                        >
                                            ×
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
