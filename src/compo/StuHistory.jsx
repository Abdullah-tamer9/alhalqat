import { useParams, Link } from "react-router-dom";
import QiraaList from "./QiraaList";

export default function StuHistory({ students, recitations, setRecitations }) {
  const { studentId } = useParams();
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return (
      <div className="container">
        <p>الطالب غير موجود</p>
        <Link to="/alHalqat">رجوع للحلقات</Link>
      </div>
    );
  }

  const log = recitations
    .filter((r) => r.studentId === studentId)
    .reverse()
    .sort((a, b) => b.date.localeCompare(a.date));

  function remove(id) {
    if (!window.confirm("حذف التسميعة؟")) return;
    setRecitations(recitations.filter((r) => r.id !== id));
  }

  return (
    <div className="container">
      <div className="d-flex gap-3">
        <Link to="/">← اليوم</Link>
        <Link to={`/halaqat/${student.halaqaId}`}>← الحلقة</Link>
      </div>
      <h4 className="my-3">سجل {student.name}</h4>

      <QiraaList
        recitations={log}
        students={students}
        onDelete={remove}
        showStudent={false}
      />
    </div>
  );
}