import { useState } from "react";
import {surahs} from "../data/surahs";

export default function QiraaForm({ students, onAdd }) {
  const [studentId, setStudentId] = useState("");
  const [type, setType] = useState("new");
 const [fromSurah, setFromSurah] = useState("");
const [fromAyah, setFromAyah] = useState("");
const [toSurah, setToSurah] = useState("");
const [toAyah, setToAyah] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
   const sFrom = surahs.find((s) => s.name === fromSurah);
  const sTo = surahs.find((s) => s.name === toSurah);
  const f = Number(fromAyah);
  const t = Number(toAyah);
if (!studentId || !sFrom || !sTo) return setError("اختر الطالب والسورتين");
  if (!Number.isInteger(f) || !Number.isInteger(t) || f < 1 || t < 1)
    return setError("أدخل أرقام آيات صحيحة");
  if (f > sFrom.ayahs)
    return setError(`عدد آيات سورة ${sFrom.name} هو ${sFrom.ayahs}`);
  if (t > sTo.ayahs)
    return setError(`عدد آيات سورة ${sTo.name} هو ${sTo.ayahs}`);

  const i = surahs.indexOf(sFrom);
  const j = surahs.indexOf(sTo);
  if (i > j) return setError("سورة النهاية قبل سورة البداية");
  if (i === j && f > t) return setError("آية البداية أكبر من آية النهاية");

  onAdd({
    studentId,
    type,
    fromSurah: sFrom.name,
    fromAyah: f,
    toSurah: sTo.name,
    toAyah: t,
  });
  setError("");
  setFromSurah("");
  setFromAyah("");
  setToSurah("");
  setToAyah("");
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
  <div className="col-8">
    <select className="form-select" value={fromSurah} onChange={(e) => setFromSurah(e.target.value)}>
      <option value="">من سورة</option>
      {surahs.map((s) => (
        <option key={s.name} value={s.name}>{s.name}</option>
      ))}
    </select>
  </div>
  <div className="col-4">
    <input type="number" min="1" className="form-control" placeholder="آية" value={fromAyah} onChange={(e) => setFromAyah(e.target.value)} />
  </div>
</div>

<div className="row g-2 mb-2">
  <div className="col-8">
    <select className="form-select" value={toSurah} onChange={(e) => setToSurah(e.target.value)}>
      <option value="">إلى سورة</option>
      {surahs.map((s) => (
        <option key={s.name} value={s.name}>{s.name}</option>
      ))}
    </select>
  </div>
  <div className="col-4">
    <input type="number" min="1" className="form-control" placeholder="آية" value={toAyah} onChange={(e) => setToAyah(e.target.value)} />
  </div>
</div>

      {error && <div className="text-danger mb-2">{error}</div>}
      <button className="btn btn-success">إضافة</button>
    </form>
  );
}