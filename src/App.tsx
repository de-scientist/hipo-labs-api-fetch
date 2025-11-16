import { useState } from "react";
import axios from "axios";

interface University {
  name: string;
  web_pages: string[];
  domains: string[];
  country: string;
}

function App() {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGetUniversity() {
    try {
      setLoading(true);
      setError("");
      setUniversities([]);

      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`,
      );

      setUniversities(response.data);
    } catch (err) {
      setError("Something went wrong, kindly try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="heading">Universities Finder</h1>

      <div className="card">
        <input
          type="text"
          placeholder="Enter a country name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="input"
        />

        <button onClick={handleGetUniversity} className="button">
          {loading ? "Loading..." : "Get Universities"}
        </button>

        {error && <h2 className="error">{error}</h2>}

        <div className="uni-list">
          {universities.map((uni) => {
            const webUrl = uni.web_pages[0] || "#";

            return (
              <div key={uni.name} className="university-item">
                <a
                  href={webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uni-link"
                >
                  <h3>{uni.name}</h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
