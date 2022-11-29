import React from "react";

function DeckForm({ deck = {}, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control text-secondary"
          id="name"
          name="name"
          placeholder="Deck Name"
          defaultValue={deck.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control text-secondary"
          id="description"
          name="description"
          rows="3"
          placeholder="Brief description of the deck"
          defaultValue={deck.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
export default DeckForm;
