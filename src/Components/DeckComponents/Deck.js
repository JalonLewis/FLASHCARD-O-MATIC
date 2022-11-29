import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api/index";
import {
  useParams,
  useHistory,
  useRouteMatch,
  Route,
  Link,
} from "react-router-dom";
import EditDeck from "./EditDeck";
import Study from "../CardComponents/Study";
import AddCard from "../CardComponents/AddCard";
import EditCard from "../CardComponents/EditCard";

function Deck() {
  let { deckId } = useParams();
  let [deck, setDeck] = useState({});
  let [cards, setCards] = useState([]);
  const history = useHistory();
  const url = useRouteMatch().url;

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setCards(response.cards);
    }
    loadDeck();
  }, [deckId]);

  function handleDeleteDeck(deckId) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      async function DeleteDeck() {
        await deleteDeck(deckId);
        history.go(0);
      }
      DeleteDeck();
    }
  }

  function handleDeleteCard(cardId) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      async function DeleteCard() {
        await deleteCard(cardId);
        history.go(0);
      }
      DeleteCard();
    }
  }
  let cardsList = cards.map((card) => {
    return (
      <div
        key={card.id}
        className="card rounded-0 border-bottom border-right-0 border-left-0 border-top-0"
      >
        <div className="card-body text-muted font-size-2rem">
          <div className="row">
            <div className="col">{card.front}</div>
            <div className="col">{card.back}</div>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            style={{ float: "right" }}
            onClick={() => handleDeleteCard(card.id)}
          >
            <i className="bi-trash"></i>
          </button>

          <button
            type="button"
            className="btn btn-secondary mr-2"
            style={{ float: "right" }}
            onClick={() =>
              history.push(`/decks/${deckId}/cards/${card.id}/edit`)
            }
          >
            <i className="bi bi-pencil"></i> Edit
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Route exact path={url}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>

        <div className="card border-0">
          <div className="card-body pl-0">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <button
              type="button"
              className="btn btn-secondary ml-0 mr-2"
              onClick={() => history.push(`/decks/${deck.id}/edit`)}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={() => history.push(`/decks/${deck.id}/study`)}
            >
              <i className="bi bi-journal-bookmark"></i> Study
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
            >
              <i className="bi bi-plus-lg"></i> Add Cards
            </button>
            <button
              type="button"
              className="btn btn-danger float-right mx-2"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <h4>Cards</h4>
        <div className="card-group d-flex flex-column border border-bottom-0 rounded mb-3">
          {cardsList}
        </div>
      </Route>
      <Route path={`${url}/edit`}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to={url}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <EditDeck deck={deck} />
      </Route>
      <Route path={`${url}/study`}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={url}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <Study deckId={deckId} />
      </Route>
      <Route path={`${url}/cards/new`}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={url}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
        <h2>{deck.name}: Add Card</h2>
        <AddCard deck={deck} />
      </Route>
      <Route path={`${url}/cards/:cardId/edit`}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={url}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card
            </li>
          </ol>
        </nav>
        <h2>Edit Card</h2>
        <EditCard deckId={deckId} />
      </Route>
    </div>
  );
}

export default Deck;
