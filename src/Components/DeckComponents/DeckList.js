import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api/index";

function DeckList() {
  const history = useHistory();
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDeckList(response);
    }
    loadDecks();
  }, []);

  function handleDelete(deckId) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      async function deleteDeckFromList() {
        await deleteDeck(deckId);
        history.go(0);
      }
      deleteDeckFromList();
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary mb-2"
        onClick={() => history.push("/decks/new")}
      >
        <i className="bi bi-plus-lg"></i> Create Deck
      </button>
      <div className="card-group d-flex flex-column border border-bottom-0 rounded mb-3">
        {deckList.map((deck) => {
          return (
            <div
              key={deck.id}
              className="card rounded-0 border-bottom border-right-0 border-left-0 border-top-0"
            >
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title col">
                    {deck.name}
                    <small className="text-muted float-right">
                      {deck.cards.length} cards
                    </small>
                  </h5>
                </div>
                <p className="card-text">{deck.description}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => history.push(`/decks/${deck.id}`)}
                >
                  <i className="bi bi-eye"></i> View
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() => history.push(`/decks/${deck.id}/study`)}
                >
                  <i className="bi bi-journal-bookmark"></i> Study
                </button>
                <button
                  type="button"
                  className="btn btn-danger float-right mx-2"
                  onClick={() => handleDelete(deck.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeckList;
