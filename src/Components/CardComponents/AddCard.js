import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard } from "../../utils/api/index";
import Form from "./CardForm";

function AddCard({ deck }) {
  const history = useHistory();

  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newCard = {
      front: formData.front,
      back: formData.back,
    };
    async function createNewCard() {
      await createCard(deck.id, newCard);
      history.go(0);
    }
    createNewCard();
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }

  return (
    <div>
      <Form
        card={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDoneAndCancel={handleDone}
        doneOrCancel = "Done"
      />
    </div>
  );
}

export default AddCard;
