import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDeck = {
      name: formData.name,
      description: formData.description,
      cards: [],
    };
    async function createNewDeck() {
      const createdDeck = await createDeck(newDeck);
      history.push(`/decks/${createdDeck.id}`);
    }
    createNewDeck();
  };

  function handleCancel() {
    history.push("/");
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-door-fill"></i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <DeckForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default CreateDeck;
