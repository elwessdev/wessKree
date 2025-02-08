// import Logo from '/logo.jpeg'
import { Outlet } from "react-router-dom";
import Nav from "./Nav/nav";
// import Footer from "./Footer/footer";
import ScrollToTop from "./Routes/scrollToTop";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Nav />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default App;
