import { useEffect, useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/students`
      );

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStudentAdded = (student) => {
    setStudents((prevStudents) => [
      ...prevStudents,
      student
    ]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/students/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        alert("Failed to delete student");
        return;
      }

      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) => student._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <h1>Student Management System</h1>

      <StudentForm
        onStudentAdded={handleStudentAdded}
      />

      <StudentList
        students={students}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default App;