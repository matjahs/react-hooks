// Lifting state
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from 'react'

function Name({name, onNameChange}: any) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}: any) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

function Display({name, animal}: any) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal ? animal + "!" : ""}`}</div>
}

function App() {
  const [name, setName] = React.useState("");
  const [animal, setAnimal] = React.useState("");

  return (
    <form>
      <Name name={name} onNameChange={(event: any) => setName(event.target.value)} />
      <FavoriteAnimal animal={animal} onAnimalChange={(event: any) => setAnimal(event.target.value)}/>
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App
