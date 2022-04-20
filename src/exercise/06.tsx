// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.tsx

import * as React from "react";
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonErrorBoundary } from "../pokemon";

const enum Status {
  Idle,
  Pending,
  Resolved,
  Rejected
}

interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface Attacks {
  special: Attack[];
}

interface PokemonData {
  id: string;
  number: number;
  name: string;
  image: string;
  attacks: Attacks;
}

interface State {
  status: Status;
  pokemon: PokemonData | null;
  error: Error | null;
}

const initialState: State = {
  status: Status.Idle,
  pokemon: null,
  error: null
};

function PokemonInfo({ pokemonName }: any): any {
  const [state, setState] = React.useState<State>(initialState);

  React.useEffect(() => {
    if(!pokemonName) {
      return;
    }

    async function effect() {
      setState(prevState => ({
        ...prevState,
        status: Status.Pending
      }));
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState(prevState => ({
            ...prevState,
            pokemon: pokemonData,
            status: Status.Resolved
          }));
        })
        .catch((error => {
          setState(prevState => ({
            ...prevState,
            error,
            status: Status.Rejected
          }));
        }));
    }

    // noinspection JSIgnoredPromiseFromCall
    effect();
  }, [pokemonName]);

  if(state.status === Status.Rejected) {
    // Will be handled by our error boundary.
    throw state.error;
  }

  if(state.status === Status.Idle) {
    return "Submit a pokemon";
  }

  if(state.status === Status.Pending) {
    return <PokemonInfoFallback name={pokemonName} />;
  }

  if(state.status === Status.Resolved) {
    return <PokemonDataView pokemon={state.pokemon} />;
  }

  throw new Error("Unknown state, this should be impossible");
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName: any) {
    setPokemonName(newPokemonName);
  }

  return (

    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

export default App;
