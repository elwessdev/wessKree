// import reactLogo from './assets/react.svg'
import Logo from '/logo.jpeg'
// import './App.css'

import Header from "./Header/header"
import Properties from "./Items/properties"
import Nav from "./Nav/nav"

function App() {
  return (
    <div className="App">
      <Nav />
      <Header />
      <Properties />
    </div>
  )
}

export default App
