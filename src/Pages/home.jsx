import { Link } from 'react-router-dom';
import './Css/home.css';


function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the PokeApp</h1>
      <p>Explore your Pokémon list or see details of your favorite Pokémon.</p>

      <div className="home-buttons">
        <Link className="home-link" to="/List">Go to List</Link>
        <Link className="home-link" to="/Details/1">See Details</Link>
      </div>
    </div>
  );
}

export default Home;
