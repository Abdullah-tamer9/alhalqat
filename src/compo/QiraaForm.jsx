import { useState } from "react";
import {surahs} from "../data/surahs";

export default function QiraaForm({ students, onAdd }) {
  const [studentId, setStudentId] = useState("");
  const [type, setType] = useState("new");
  const [surahName, setSurahName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const surah = surahs.find((s) => s.name === surahName);
    const f = Number(from);
    const t = Number(to);

    if (!studentId || !surah) return setError("اختر الطالب والسورة");
    if (!Number.isInteger(f) || !Number.isInteger(t) || f < 1)
      return setError("أدخل أرقام آيات صحيحة");
    if (t > surah.ayahs)
      return setError(`عدد آيات سورة ${surah.name} هو ${surah.ayahs}`);
    if (f > t) return setError("آية البداية أكبر من آية النهاية");

    onAdd({ studentId, type, surah: surah.name, from: f, to: t });
    setError("");
    setSurahName("");
    setFrom("");
    setTo("");
  }

  return (
    <form onSubmit={submit} className="mb-4">
      <div className="row g-2 mb-2">
        <div className="col-12 col-md-6">
          <select className="form-select" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
            <option value="">اختر الطالب</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-6">
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="new">جديد</option>
            <option value="review">مراجعة</option>
          </select>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-12 col-md-6">
          <select className="form-select" value={surahName} onChange={(e) => setSurahName(e.target.value)}>
            <option value="">اختر السورة</option>
            {surahs.map((s) => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <input type="number" min="1" className="form-control" placeholder="من آية" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="col-6 col-md-3">
          <input type="number" min="1" className="form-control" placeholder="إلى آية" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      {error && <div className="text-danger mb-2">{error}</div>}
      <button className="btn btn-success">إضافة</button>
    </form>
  );
}