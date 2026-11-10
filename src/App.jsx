
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useContext } from "react";
import { StudentProvider, StudentContext } from "./context/StudentContext";
import StudentList from "./pages/StudentList";
import FavouriteStudents from "./pages/FavouriteStudents";
import "./App.css";

function Navigation() {
  const { favourites } = useContext(StudentContext);

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">🎓</span>
        <span>Student<span className="brand-highlight">Hub</span></span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/favourites">
          Favourites <span className="nav-count">{favourites.length}</span>
        </NavLink>
      </div>

      <div className="nav-profile">
        <span>👩🏻‍🎓</span>
        <div><strong>Student Portal</strong><small>Welcome back!</small></div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/favourites" element={<FavouriteStudents />} />
        </Routes>

        <footer className="footer">
          <p>© 2026 StudentHub | Built with React ❤️</p>
          <span>Learn • Connect • Grow</span>
        </footer>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
