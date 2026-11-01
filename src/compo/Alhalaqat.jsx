import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Alhalaqat({ teacher, setTeacher, halaqat, setHalaqat }) {
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  function submit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    if (editingId) {
      setHalaqat(halaqat.map((h) => (h.id === editingId ? { ...h, name: trimmed } : h)));
      setEditingId(null);
    } else {
      setHalaqat([...halaqat, { id: crypto.randomUUID(), name: trimmed }]);
    }
    setName("");
  }

  function startEdit(h) {
    setEditingId(h.id);
    setName(h.name);
  }

  function remove(id) {
    if (!window.confirm("حذف الحلقة؟")) return;
    setHalaqat(halaqat.filter((h) => h.id !== id));
  }

  return (
    <div className="container">
      <Header teacher={teacher} setTeacher={setTeacher} />
<Link to={"/"}>الصفحة الرئيسية</Link>
      <form onSubmit={submit} className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="اسم الحلقة"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success">{editingId ? "تعديل" : "إضافة"}</button>
      </form>

      {halaqat.length === 0 && <p className="text-muted">لا توجد حلقات بعد</p>}

      <ul className="list-group">
        {halaqat.map((h) => (
          <li key={h.id} className="list-group-item d-flex justify-content-between align-items-center">
           
              
              <Link to={`/alHalqat/${h.id}`}>{h.name}</Link>
           
            
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(h)}>
                تعديل
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => remove(h.id)}>
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alhalaqat;