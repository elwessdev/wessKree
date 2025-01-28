// import Logo from '/logo.jpeg'
import { Outlet } from "react-router-dom";
import Nav from "./Nav/nav";
// import Footer from "./Footer/footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default App;
