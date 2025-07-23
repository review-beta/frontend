import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Deals from "./pages/Deals";
import Movies from "./pages/Movies";
import Dining from "./pages/Dining";
import Events from "./pages/Events";
import Activities from "./pages/Activities"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/events" element={<Events />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;