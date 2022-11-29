import React from "react";

function CardForm({
  card = {},
  handleChange,
  handleSubmit,
  handleDoneAndCancel,
  doneOrCancel

}) {

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={card.front}
            placeholder="Front side of card"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={card.back}
            placeholder="Back side of card"
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleDoneAndCancel}
        >
          {doneOrCancel}
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    );
}

export default CardForm;
