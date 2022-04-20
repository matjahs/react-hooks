// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.tsx

import * as React from "react";
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from "../pokemon";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

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

function PokemonInfo({ pokemonName }: any): any {
  const [state, setState] = React.useState<State>({
    status: pokemonName ? Status.Pending : Status.Idle,
    pokemon: null,
    error: null
  });

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

  function handleReset() {
    setPokemonName("");
  }

  return (

    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
