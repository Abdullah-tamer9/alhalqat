import { useState } from "react";

export default function Header({ teacher, setTeacher }) {
  const [editing, setEditing] = useState(!teacher);
  const [name, setName] = useState(teacher);

  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function save() {
    if (!name.trim()) return;
    setTeacher(name.trim());
    setEditing(false);
  }

  return (
    <header className="d-flex justify-content-between align-items-center border-bottom p-3 mb-3">
      {editing ? (
        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="اسم المعلم"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-success" onClick={save}>
            حفظ
          </button>
        </div>
      ) : (
        <h5 className="m-0" role="button" onClick={() => setEditing(true)}>
          {teacher}
        </h5>
      )}
      <small className="text-muted">{today}</small>
    </header>
  );
}