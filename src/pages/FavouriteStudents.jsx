
import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";

function FavouriteStudents() {
  const { favourites, removeFavourite } = useContext(StudentContext);
  const [search, setSearch] = useState("");

  const filtered = favourites.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    String(student.id).includes(search)
  );

  return (
    <div className="page-container">
      <section className="welcome-banner favourite-banner">
        <div>
          <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
          <h1>Favourite <span>Students. ❤️</span></h1>
          <p>All your favourite people, together in one place.</p>
        </div>
        <div className="banner-emoji">💖</div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <div>
            <h2>My Favourite Collection</h2>
            <p>You have saved {favourites.length} student(s).</p>
          </div>
          <span className="result-count">{favourites.length} saved</span>
        </div>

        {favourites.length > 0 && (
          <div className="filter-bar">
            <input
              type="text"
              placeholder="🔍 Search your favourites..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="student-grid">
            {filtered.map((student) => (
              <div className="student-card" key={student.id}>
                <div className="card-top">
                  <span className="student-avatar">{student.emoji}</span>
                  <span className="department-tag">{student.department}</span>
                  <span className="saved-heart">♥</span>
                </div>

                <h3>{student.name}</h3>
                <p className="roll-number">Roll No: {student.id}</p>
                <p className="student-info">🎓 {student.year}</p>
                <p className="student-info">✉️ {student.email}</p>
                <div className="skills">💡 {student.skills}</div>

                <button
                  className="remove-btn"
                  onClick={() => removeFavourite(student.id)}
                >
                  Remove from Favourites
                </button>
              </div>
            ))}
          </div>
        ) : favourites.length === 0 ? (
          <div className="empty-state">
            <span>💔</span>
            <h2>No favourite students added yet</h2>
            <p>Visit the Student List and add students you like!</p>
          </div>
        ) : (
          <div className="no-results">
            <span>🔎</span>
            <h3>No matching favourites</h3>
            <p>Try searching with another name or roll number.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default FavouriteStudents;
