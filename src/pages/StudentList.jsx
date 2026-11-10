
import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";

const students = [
  { id: 101, name: "Arun Kumar", department: "CSE", year: "III Year", email: "arun@gmail.com", skills: "React, JavaScript", emoji: "👨🏻‍💻" },
  { id: 102, name: "Priya Sharma", department: "IT", year: "III Year", email: "priya@gmail.com", skills: "Python, UI Design", emoji: "👩🏻‍💻" },
  { id: 103, name: "Karthik Raj", department: "ECE", year: "II Year", email: "karthik@gmail.com", skills: "Java, SQL", emoji: "🧑🏻‍🎓" },
  { id: 104, name: "Divya Sri", department: "CSE", year: "II Year", email: "divya@gmail.com", skills: "HTML, CSS", emoji: "👩🏻‍🎓" },
  { id: 105, name: "Rahul Dev", department: "IT", year: "IV Year", email: "rahul@gmail.com", skills: "Node.js, React", emoji: "👨🏻‍🎓" },
  { id: 106, name: "Sneha R", department: "AIML", year: "III Year", email: "sneha@gmail.com", skills: "Python, Machine Learning", emoji: "👩🏻‍💻" },
  { id: 107, name: "Vijay Anand", department: "CSE", year: "IV Year", email: "vijay@gmail.com", skills: "Java, DSA", emoji: "🧑🏻‍💻" },
  { id: 108, name: "Meena Lakshmi", department: "ECE", year: "I Year", email: "meena@gmail.com", skills: "C, Electronics", emoji: "👩🏻‍🎓" }
];

function StudentList() {
  const { favourites, addFavourite, removeFavourite } =
    useContext(StudentContext);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      String(student.id).includes(search);

    const matchesDepartment =
      department === "All" || student.department === department;

    return matchesSearch && matchesDepartment;
  });

  const isFavourite = (id) =>
    favourites.some((student) => student.id === id);

  return (
    <div className="page-container">
      <section className="welcome-banner">
        <div>
          <span className="eyebrow">STUDENT COMMUNITY</span>
          <h1>Discover Your <span>People.</span></h1>
          <p>Explore students, connect with talented minds and build your favourite student community.</p>
        </div>
        <div className="banner-emoji">🎓</div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon blue">👥</span>
          <div><h2>{students.length}</h2><p>Total Students</p></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon pink">❤️</span>
          <div><h2>{favourites.length}</h2><p>My Favourites</p></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon purple">🏫</span>
          <div><h2>4</h2><p>Departments</p></div>
        </div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <div>
            <h2>Student Directory</h2>
            <p>Find and add your favourite students.</p>
          </div>
          <span className="result-count">
            {filteredStudents.length} students found
          </span>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="🔍 Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="AIML">AIML</option>
          </select>
        </div>

        <div className="student-grid">
          {filteredStudents.map((student) => (
            <div className="student-card" key={student.id}>
              <div className="card-top">
                <span className="student-avatar">{student.emoji}</span>
                <span className="department-tag">{student.department}</span>
                <button
                  className={`heart-btn ${isFavourite(student.id) ? "liked" : ""}`}
                  onClick={() =>
                    isFavourite(student.id)
                      ? removeFavourite(student.id)
                      : addFavourite(student)
                  }
                  aria-label="Toggle favourite"
                >
                  {isFavourite(student.id) ? "♥" : "♡"}
                </button>
              </div>

              <h3>{student.name}</h3>
              <p className="roll-number">Roll No: {student.id}</p>
              <p className="student-info">🎓 {student.year}</p>
              <p className="student-info">✉️ {student.email}</p>

              <div className="skills">💡 {student.skills}</div>

              <button
                className={`favourite-btn ${isFavourite(student.id) ? "added" : ""}`}
                onClick={() =>
                  isFavourite(student.id)
                    ? removeFavourite(student.id)
                    : addFavourite(student)
                }
              >
                {isFavourite(student.id) ? "✓ Added to Favourites" : "+ Add to Favourite"}
              </button>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="no-results">
            <span>🔎</span>
            <h3>No students found</h3>
            <p>Try another name or department.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentList;
