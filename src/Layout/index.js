import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Components/DeckComponents/DeckList";
import CreateDeck from "../Components/DeckComponents/CreateDeck";
import Deck from "../Components/DeckComponents/Deck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <DeckList />
          </Route>
          <Route exact path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
