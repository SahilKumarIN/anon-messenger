import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthCheck from "./AuthCheck";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />

        <Route path="/new-message/:id" element={<Messages />} />

        <Route
          path="/contact"
          element={
            <AuthCheck>
              <Contact />
            </AuthCheck>
          }
        />

        <Route
          path="/about"
          element={
            <AuthCheck>
              <About />
            </AuthCheck>
          }
        />

        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
