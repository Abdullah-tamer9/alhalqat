import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import StuForm from "./StuForm";

export default function AlhalaqatID({ halaqat, students, setStudents }) {
  const { halaqaId } = useParams();
  const [editingStudent, setEditingStudent] = useState(null);

  const halaqa = halaqat.find((h) => h.id === halaqaId);
  const halaqaStudents = students.filter((s) => s.halaqaId === halaqaId);

  if (!halaqa) {
    return (
      <div className="container">
        <p>الحلقة غير موجودة</p>
        <Link to="/alHalqat">رجوع للحلقات</Link>
      </div>
    );
  }

  function save(name) {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? { ...s, name } : s)));
      setEditingStudent(null);
    } else {
      setStudents([...students, { id: crypto.randomUUID(), halaqaId, name }]);
    }
  }

  function remove(id) {
    if (!window.confirm("حذف الطالب؟")) return;
    setStudents(students.filter((s) => s.id !== id));
  }

  return (
    <div className="container">
        <Link to={"/"}>الصفحة الرئيسية ←</Link>
      <Link to="/alHalqat">← الحلقات</Link>
      <h4 className="my-3">{halaqa.name}</h4>

      <StuForm
        key={editingStudent ? editingStudent.id : "new"}
        student={editingStudent}
        onSave={save}
        onCancel={() => setEditingStudent(null)}
      />

      {halaqaStudents.length === 0 && <p className="text-muted">لا يوجد طلاب بعد</p>}

      <ul className="list-group">
        {halaqaStudents.map((s) => (
          <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/students/${s.id}`}>{s.name}</Link>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingStudent(s)}>
                تعديل
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => remove(s.id)}>
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}