// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

function useLocalStorageState(initialName: string = "") {
  const initialState = () => window.localStorage.getItem("name") ?? initialName;
  const [name, setName] = React.useState(initialState);

  return {name, setName}
}

function Greeting({initialName = ""}: {initialName?: string}) {
  const {name, setName} = useLocalStorageState(initialName)

  React.useEffect(() => {
    if (name) {
      window.localStorage.setItem("name", name);
    }
  }, [name]);

  function handleChange(event: any) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
