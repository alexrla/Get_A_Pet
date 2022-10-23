import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Container from "./components/layout/Container/Container";

// Pages - Auth
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

// Context
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
