// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";


interface UseLocalStorageStateOptions<T> {
  key: string;
  defaultValue?: unknown;
  serialize?: (arg: T) => string;
  deserialize?: (arg: string) => T;
}

function useLocalStorageState<T = string>(
  {key, defaultValue, serialize = JSON.stringify, deserialize = JSON.parse}: UseLocalStorageStateOptions<T>) {
  const [state, setState] = React.useState(
    () => {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue) {
        return deserialize(storedValue);
      }

      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  );

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;

    if(prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;

    window.localStorage.setItem(key, serialize(state));
  }, [state, key, serialize, deserialize]);

  return { state, setState };
}

function Greeting({ initialName = "" }: { initialName?: string }) {
  const { state, setState } = useLocalStorageState({key: "name", defaultValue: initialName});

  function handleChange(event: any) {
    setState(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={state} onChange={handleChange} id="name" />
      </form>
      {state ? <strong>Hello {state}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
