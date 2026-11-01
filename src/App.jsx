import { useState } from 'react'
import { Route,Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import Alhalaqat from './compo/Alhalaqat';
import lcalstorage from "./hooks/localstorage";
import AlhalaqatID from './compo/AlhalaqatID';
import HomePage from './compo/HomePage';
import StuHistory from './compo/StuHistory';


function App() {
   const [teacher, setTeacher] = lcalstorage("teacher", "");
  const [halaqat, setHalaqat] = lcalstorage("halaqat", []);
  const [students, setStudents] = lcalstorage("students", []);
  const [recitations, setRecitations] = lcalstorage("recitations", []);
  
  const Tname="Abdullah Tamer";

  const alHalqat=[{id:1,name:"alheqs"},
    {id:2,name:"alrediaan"},
  ]

  return (
    <>
     
    <BrowserRouter  basename="/alhalqat">
    <Routes>
  
      {/* <Route path='/' element={
 <>
        <h1>المتابعة اليومية للحفظ</h1>
      <p>اسم المعلم:{Tname}</p>
      <p>
        التاريخ:{" "}
        {new Date().toLocaleDateString("ar-SA")}
      </p>
      {alHalqat.map((halaqa) => (
       <button key={halaqa.id}>
        {halaqa.name}
       </button>
      ))}
      </>
      }/>  */}
      <Route path='/' element={<HomePage 
      teacher={teacher}
  setTeacher={setTeacher}
  students={students}
  recitations={recitations}
  setRecitations={setRecitations}
      />}/>
      <Route path='/alHalqat' element={<Alhalaqat 
      teacher={teacher}
      setTeacher={setTeacher}
       halaqat={halaqat}
       setHalaqat={setHalaqat}
      />}/>
      <Route path='/alHalqat/:halaqaId' element={
        <AlhalaqatID 
        halaqat={halaqat} 
        students={students} 
        setStudents={setStudents}
        />
      }/>
      <Route path='/students/:studentId' element={
        <StuHistory 
        
        students={students}
         recitations={recitations}
          setRecitations={setRecitations} />
      }/>

    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
