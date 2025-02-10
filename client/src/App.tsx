// import Logo from '/logo.jpeg'
import { Outlet } from "react-router-dom";
import Nav from "./Nav/nav";
import Footer from "./Footer/footer";
import ScrollToTop from "./Routes/scrollToTop";

function App() {
  return (
    <div className="App">
      <main className="root">
        <ScrollToTop />
        <Nav />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App;
