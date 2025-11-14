import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleGetUniversity() {
    try {
      setLoading(true);
      setUniversity("");
      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`,
      );
      setUniversity(response.data.value);
      setLoading(false);
    } catch {
      setError("Something went wrong, kindly try again");
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Our university</h1>
      <div className="card">
        <input type="text" placeholder="Enter your country" />
        <a href="" target="_blank" rel="noopener">
          <h2></h2>
        </a>
        <button onClick={handleGetUniversity}>
          {loading
            ? "Loading please wait...."
            : "Get the country's universities"}
        </button>
        <h2>{error}</h2>
        <p>
          <a
            href="${universityWebpage}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2></h2>
            <h2>{`${university}`}</h2>
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
