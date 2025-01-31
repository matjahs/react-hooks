// Lifting state
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState("");

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
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

// function Display({name, animal}: any) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal ? animal + "!" : ""}`}</div>
// }

function Display({animal}: any) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState("");

  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={(event: any) => setAnimal(event.target.value)}/>
      <Display animal={animal} />
    </form>
  )
}

export default App
