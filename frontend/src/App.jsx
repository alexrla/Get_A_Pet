import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Container from "./components/layout/Container/Container";
import Message from "./components/layout/Message/Message";

// Pages - Auth
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Profile from "./pages/User/Profile";
import MyPets from "./pages/Pets/MyPets/MyPets";
import AddPets from "./pages/Pets/AddPets/AddPets";
import EditPet from "./pages/Pets/EditPet/EditPet";
import PetDetails from "./pages/Pets/PetDetails/PetDetails";

// Context
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPets />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/pet/:id" element={<PetDetails />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
