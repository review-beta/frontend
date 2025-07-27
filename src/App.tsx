import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Deals from "./pages/Deals";
import Movies from "./pages/Movies";
import Dining from "./pages/Dining";
import Events from "./pages/Events";
import Hangouts from "./pages/Hangouts";
import MovieForm from "./pages/admin/MovieForm";
import GenreForm from "./pages/admin/GenreForm";
import CastForm from "./pages/admin/CastForm";
import DirectorForm from "./pages/admin/DirectorForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/events" element={<Events />} />
        <Route path="/hangouts" element={<Hangouts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/movies" element={<MovieForm />} />
        <Route path="/admin/genre" element={<GenreForm />} />
        <Route path="/admin/cast" element={<CastForm />} />
        <Route path="/admin/director" element={<DirectorForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;