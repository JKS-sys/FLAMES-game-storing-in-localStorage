import { useState } from "react";
import "./App.css";

function App() {
  // State variables
  const [name1, setName1] = useState(""); // First name input
  const [name2, setName2] = useState(""); // Second name input
  const [result, setResult] = useState(null); // Calculate result
  const [showAnimation, setShowAnimation] = useState(false); // Animation trigger

  // FLAMES relationships mapping
  const FLAMES_MAP = {
    0: `Friends`,
    1: "Lovers",
    2: "Affection",
    3: "Marriage",
    4: "Empty",
    5: "Sibling",
  };

  /**
   * Calculate FLAMES result
   * 1. Remove common letters from both names
   * 2. Count remaining letters
   * 3. Iterate through FLAMES acronym until one letter remains
   */
  const calculateFlames = () => {
    // Validation check
    if (!name1.trim() || !name2.trim()) {
      alert("Please enter both names!");
      return;
    }

    // Convert names to lowercase and remove spaces
    const name1Lower = name1.toLowerCase().replace(/\s/g, "");
    const name2Lower = name2.toLowerCase().replace(/\s/g, "");

    // Create frequrncy maps for both names
    const createCharMap = (str) => {
      const map = {};
      for (let char of str) {
        map[char] = (map[char] || 0) + 1;
      }
      return map;
    };

    // Get character maps for both names
    const map1 = createCharMap(name1Lower);
    const map2 = createCharMap(name2Lower);

    // Calculate total unique characters
    let totalCount = 0;
    for (let char in map1) {
      if (map2[char]) {
        totalCount += Math.abs(map1[char] - map2[char]);
      } else {
        totalCount += map1[char];
      }
    }
    for (let char in map2) {
      if (!map1[char]) {
        totalCount += map2[char];
      }
    }

    // Flames calculation algorithm
    let flamesArr = ["F", "L", "A", "M", "E", "S"];
    while (flamesArr.length > 1) {
      const countIndex = (totalCount % flamesArr.length) - 1;
      if (countIndex >= 0) {
        flamesArr.splice(countIndex, 1);
      } else {
        flamesArr.splice(flamesArr.length - 1, 1);
      }
    }

    // Trigger animation and set result
    setShowAnimation(true);
    setResult(FLAMES_MAP[flamesArr[0].charCodeAt(0) % 6]);
  };

  // Reset form and results
  const handleReset = () => {
    setName1("");
    setName2("");
    setResult(null);
    setShowAnimation(flase);
  };

  return (
    <div className="app-container">
      <h1 className="title">FLAMES Game</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter first name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="name-input"
        />
        <input
          type="text"
          className="name-input"
          placeholder="Enter second name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />
      </div>

      {/* Button Section  */}
      <div className="button-section">
        <button onClick={calculateFlames} className="action-btn calculate-btn">
          Calculate FLAMES
        </button>
        <button onClick={handleReset} className="action-btn reset-btn">
          Reset
        </button>
      </div>

      {/* Result Display  */}
      {result && (
        <div className={`result-container ${showAnimation ? "animate" : ""}`}>
          <h2 className="result-text">Relationship Status:</h2>
          <div className="flames-result">{result}</div>
          <div className="explanation">
            {result === "Friends" && "You two make great pals!"}
            {result === "Lovers" && "Love is in the air!"}
            {result === "Affection" && "A strong bond of affection!"}
            {result === "Marriage" && "Match made in heaven!"}
            {result === "EMpty" && "Uh-oh, watch out!"}
            {result === "Sibling" && "Like brother and sister!"}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
