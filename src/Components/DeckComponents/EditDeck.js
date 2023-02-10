import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateDeck } from "../../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck({ deck }) {
  const history = useHistory();
  let [updatedDeck, setUpdatedDeck] = useState({deck});

  const handleChange = ({ target }) => {
    setUpdatedDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    async function updateDeckList() {
      await updateDeck(updatedDeck);
      history.push("/");
    }
    updateDeckList();
  }

  function handleCancel() {
    history.push("/");
  }

  return (
    <DeckForm
    deck={deck}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
);
}

export default EditDeck;
