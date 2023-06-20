import { useState, useEffect } from "react";
import "./styles.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [definition, setDefinition] = useState([]);
  const [nounWordsMeaning, setNounWordsMeanings] = useState([]);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  useEffect(() => {
    const meanings = definition.map((wordInfo) => wordInfo.definitions).flat();
    setNounWordsMeanings(meanings);
  }, [definition]);

  const changeHandler = (event) => setInputValue(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    setUrl(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
    setInputValue("");
    setIsPending(true);
  };

  const fetchData = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setDefinition([]);
          throw new Error(`Word not found. Try another word`);
        }
        return response.json();
      })
      .then((data) => {
        setIsPending(false);
        setDefinition(data[0].meanings);
        setError(null);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
      });
  };



  return (
    <>
      <h1>
          {" "}
          <span> Sha</span>bel's <span>Dictio</span>nary
      </h1>
      <form onSubmit={submitHandler}>
        <input
          name="word"
          type="text"
          placeholder="Enter word here..."
          value={inputValue}
          onChange={changeHandler}
        />
        <button type="submit">
        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path>
        </svg>
        </button>
      </form>

      <div className="word-wrapper">
        {error && !isPending && <div className="error-message"> {error} </div>}

        {isPending && <div className="pending-message"> Loading... </div>}


        {nounWordsMeaning &&
          !isPending &&
          nounWordsMeaning.map((wordInfo, index) => (
            <div className="word-meaning" key={index}>
              {wordInfo.definition}
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
