import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [empty, setEmpty] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setEmpty(false);

    try {
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc'
      );
      const result = await response.json();

      if (result.length === 0) {
        setEmpty(true);
      } else {
        setData(result);
      }
    } catch (error) {
      setError('Failed to fetch data');
    }

    setLoading(false);
  };
  return (
    <div className="contsiner">
      <h1>Cat Gallery</h1>
      <button onClick={fetchData}>Fetch Cat Images</button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {empty && <p className="empty">No data available</p>}

      <div className="grid">
        {data.map((item) => (
          <div key={item.id} className="card">
            <img src={item.url} alt="cat" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
