import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthCheck from "./AuthCheck";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Room from "./pages/Room";
import UserProfile from "./pages/UserProfile";

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

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/about"
          element={
            <AuthCheck>
              <About />
            </AuthCheck>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthCheck>
              <UserProfile />
            </AuthCheck>
          }
        />

        <Route
          path="/room/:roomId"
          element={
            // <AuthCheck>
            <Room />
            // </AuthCheck>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
