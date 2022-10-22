import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages - Auth
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
