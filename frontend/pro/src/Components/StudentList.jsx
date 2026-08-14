function StudentList({ students, onDelete }) {
  return (
    <div>
      <h2>Student List</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((student) => (
          <div key={student._id}>
            <h3>{student.name}</h3>

            <p>Email: {student.email}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>

            <button onClick={() => onDelete(student._id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default StudentList;