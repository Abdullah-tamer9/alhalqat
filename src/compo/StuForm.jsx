import { useState } from "react";

export default function StuForm({ student, onSave, onCancel }) {
  const [name, setName] = useState(student ? student.name : "");

  function submit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setName("");
  }

  return (
    <form onSubmit={submit} className="d-flex gap-2 mb-3">
      <input
        className="form-control"
        placeholder="اسم الطالب"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-success">{student ? "تعديل" : "إضافة"}</button>
      {student && (
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
          إلغاء
        </button>
      )}
    </form>
  );
}