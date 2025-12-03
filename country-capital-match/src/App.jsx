import { useState, useCallback } from "react";
import "./App.css";
import ButtonCard from "./components/Button/ButtonCard";
import { countryCapitalPairs } from "./utils/data";
import shuffleArray from "./utils/shuffleArray";

function App() {
  // shuffling of country-capital pairs for random display
  const [buttons, setButtons] = useState(() => shuffleArray(countryCapitalPairs));
  const [firstPick, setFirstPick] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");  
  const [isLocked, setIsLocked] = useState(false);  


  const handleSelect = useCallback((item) => {
    
    //To prevent clicking when we get 2 buttons selected 
      if (isLocked) return;

      if (!firstPick) {
        setFirstPick(item);
        // returning to avoid condition checking below
        return;
      }

      const isCorrect = firstPick.pair === item.id;
      setIsLocked(true);

      if (isCorrect) {
      // if pair is correct set first and current id in highlight with color as green for border
        setHighlight({ ids: [firstPick.id, item.id], color: "green" });

        // wait for border to show green, then remove highlight and firstPick and remove matched buttons
        setTimeout(() => {
          setButtons((prev) =>
            prev.filter(
              (b) => b.id !== firstPick.id && b.id !== item.id
            )
          );
          setHighlight(null);
          setFirstPick(null);
          setIsLocked(false);
        }, 1200);
      } else {
        setIsLocked(true);
        // if pair is not correct set first and current id in highlight with color as red for border and give error message
        setHighlight({ ids: [firstPick.id, item.id], color: "red" });
        setErrorMessage("Incorrect match! Try again.");

        // wait for border to show red, then remove highlight and firstPick and error message
        setTimeout(() => {
          setHighlight(null);
          setFirstPick(null);
          setIsLocked(false);
          setErrorMessage("");
        }, 1200);
      }
    },
    [firstPick, isLocked]
  );


  const getBorder = useCallback(
    (item) => {
      if (highlight?.ids.includes(item.id)) {
        return highlight.color === "green"
          ? "3px solid lightgreen"
          : "3px solid red";
      }

      if (firstPick?.id === item.id) {
        return "3px solid yellow"; // Highlight the first pick with yellow border
      }

      return "2px solid transparent";
    },
    [highlight, firstPick]
  );

  return (
  
    <div className="parent">
    <div className="container">
      {buttons.map((item) => (
        <ButtonCard
          key={item.id}
          label={item.label}
          border={getBorder(item)}
          onClick={() => handleSelect(item)}
        />
      ))}
      {buttons.length === 0 && (
      <div className="congrats-message text-center">
        Congratulations! You've matched all countries and capitals!
      </div>
    )}
     {errorMessage && (
        <div className="error-box">{errorMessage}</div>
      )}
    </div>
    </div>
  );
}

export default App;
