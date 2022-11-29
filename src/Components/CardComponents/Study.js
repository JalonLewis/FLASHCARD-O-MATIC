import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index";

function Study({ deckId }) {
  const [cardId, setCardId] = useState(1);
  const [Flipped, setFlipped] = useState(false);
  const [cardList, setCardList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setCardList(response.cards);
    }
    loadDeck();
  }, [deckId]);

  function handleFlip() {
    Flipped ? setFlipped(false) : setFlipped(true);
    if (cardId === cardList.length) {
      if (
        window.confirm(
          "Restart Cards? \n\n Click 'cancel' to return to the home page."
        )
      ) {
        setCardId(1);
        setFlipped(false);
      } else {
        history.push("/");
      }
    }
  }

  function handleNext() {
    if (cardId < cardList.length) {
      setCardId(cardId + 1);
    }
    setFlipped(false);
  }

  if (cardList.length < 3) {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cardList.length} cards
          in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button type="button" className="btn btn-primary">
            <i className="bi bi-plus-lg"></i> Add Cards
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardId} of {cardList.length}
          </h5>
          <div className="card-text">
            {Flipped ? cardList[cardId-1].back : cardList[cardId-1].front}
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2 mt-3"
            onClick={handleFlip}
          >
            Flip
          </button>
          {Flipped ? (
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleNext}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Study;
