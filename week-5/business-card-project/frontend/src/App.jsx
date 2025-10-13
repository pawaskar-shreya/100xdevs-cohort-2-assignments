import { useState } from 'react'
import './App.css'
import { AllCards } from './components/AllCards';
import { NewCard } from './components/NewCard';

let fetched = false;

function App() {
  const [cards, setCard] = useState();

  if(!fetched) {
    fetched = true;

    fetch("http://localhost:3000/read")
    .then(async function(res) {
      let response = await res.json();
      setCard(response.Cards);
      // console.log(response)
    })
    .catch(function(err) {                          // this is to avoid the fetch being called recursively without using useEffects
      console.log('Fetch failed:' + err)
    })
  }

  // console.log(cards)
  return (
    <div>
      <NewCard />
      <AllCards cards={cards} />
    </div>
  )
}

export default App
