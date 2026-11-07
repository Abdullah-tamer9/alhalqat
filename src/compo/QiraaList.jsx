export default function QiraaList({ recitations, students, onDelete, showStudent = true }) {
  if (recitations.length === 0) {
    return <p className="text-muted">لا توجد تسميعات</p>;
  }

  function studentName(id) {
    const s = students.find((st) => st.id === id);
    return s ? s.name : "طالب محذوف";
  }

  return (
    <ul className="list-group">
      {recitations.map((r) => (
        <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            {showStudent && <strong>{studentName(r.studentId)} — </strong>}
            <span className="badge bg-secondary ms-1">{r.type === "new" ? "جديد" : "مراجعة"}</span>{" "}
            {r.fromSurah
              ? r.fromSurah === r.toSurah
                 ? `${r.fromSurah} (${r.fromAyah}–${r.toAyah})`
                    : `${r.fromSurah} (${r.fromAyah}) ← ${r.toSurah} (${r.toAyah})`
                        : `${r.surah} (${r.from}–${r.to})`}
            <div className="text-muted small"> {new Date(r.date + "T00:00:00").toLocaleDateString("ar-EG", { weekday: "long" })} - {r.date}</div>
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(r.id)}>
            حذف
          </button>
        </li>
      ))}
    </ul>
  );
}