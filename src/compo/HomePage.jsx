import { Link } from "react-router-dom";
import Header from "./Header";
import QiraaForm from "./QiraaForm";
import QiraaList from "./QiraaList";

export default function TodayPage({ teacher, setTeacher, students, recitations, setRecitations }) {
  const today = new Date().toLocaleDateString("en-CA");
  const todays = recitations.filter((r) => r.date === today);

  function add(data) {
    setRecitations([...recitations, { id: crypto.randomUUID(), date: today, ...data }]);
  }

  function remove(id) {
    if (!window.confirm("حذف التسميعة؟")) return;
    setRecitations(recitations.filter((r) => r.id !== id));
  }

  return (
    <div className="container">
      <Header teacher={teacher} setTeacher={setTeacher} />
      <Link to="/alHalqat" className="d-inline-block mb-3">الحلقات ←</Link>

      <h5>حفظ اليوم</h5>
      <QiraaForm students={students} onAdd={add} />
      <QiraaList recitations={todays} students={students} onDelete={remove} />
    </div>
  );
}