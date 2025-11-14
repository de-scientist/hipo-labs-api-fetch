//add relevant imports
//import useState which lets components store and manage internal values that change over time
import { useState } from "react";
import axios from "axios";
import "./App.css";

interface TheUniversityReturn{
  name: string;
  web_pages: string[];
  domains: string[];
  country: string;
}

function App() {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState<TheUniversityReturn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGetUniversity() {
    try {
      setLoading(true);
      setError("");
      setUniversities([]);
      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`
      );

      setUniversities(response.data);
      setLoading(false);
    } catch (error){

      setError("Something went wrong, kindly try again");
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="heading">Universities Finder</h1>
      <div className="card">
        <input type="text" 
        placeholder="Enter a country name"  
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="input"
        />

        <button onClick={handleGetUniversity} className="button">
          {loading
            ? "Loading please wait...."
            : "Get the country's universities"}
        </button>

        {error && <h2>{error}</h2>}

        <div>
          {universities.map((uni) => (
            <div key={uni.name} className="university-item">
              <h3>{uni.name}</h3>

              {uni.web_pages.map((url) => (
                <a
                key={url} 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                >
                  {url}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
