// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

function useLocalStorageState(key: string, defaultValue: string = "") {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, state ?? "");
  }, [state, state]);

  return {state, setState}
}

function Greeting({initialName = ""}: {initialName?: string}) {
  const {state, setState} = useLocalStorageState("name", initialName)

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
