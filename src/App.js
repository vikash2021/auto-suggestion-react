import { useEffect, useRef, useState } from "react";
import { cityData } from "./data/cityData";
import "./styles.css";

export default function App() {
  const inputRef = useRef();
  const suggestionBoxRef = useRef();
  const [isSuggstionBoxVisible, setSuggestionBoxVisibility] = useState(false);
  const [inputText, setInputText] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target !== inputRef.current &&
        e.target !== suggestionBoxRef.current
      ) {
        setSuggestionBoxVisibility(false);
      }
    });
    return () => {
      window.removeEventListener("click", () => {});
    };
  });

  const filterSuggestions = (value) => {
    if (!value) {
      return;
    }
    const text = value.trim().replace(/\s/g, "");
    const filteredSuggestions = cityData.filter((name) =>
      name.toLowerCase().includes(text)
    );
    setSuggestionsList(filteredSuggestions);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (!value) setSuggestionsList([]);
    setInputText(value);
    filterSuggestions(value);
  };

  return (
    <div className="app">
      <input
        id="search"
        placeholder="Enter text here"
        className="searchBox"
        onFocus={() => setSuggestionBoxVisibility(true)}
        onBlur={() => setSuggestionBoxVisibility(false)}
        onChange={handleChange}
        value={inputText}
        ref={inputRef}
      />
      {isSuggstionBoxVisible && (
        <div
          id="suggestionBox"
          className="suggestionBox"
          ref={suggestionBoxRef}
        >
          {suggestionsList?.map((data) => {
            return (
              <div
                onClick={() => setInputText(data)}
                style={{ cursor: "pointer" }}
              >
                {data}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
