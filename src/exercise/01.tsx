// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}: {initialName: string}) {
  const [name, setName] = React.useState(initialName);

  function handleChange(event: any) {
    event.preventDefault();
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="foo" />
}

export default App
