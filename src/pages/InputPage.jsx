import React, { useState, useEffect } from 'react';
import './InputPage.css';

function InputPage() {
  const initialSubject = (id) => ({
    id: id,
    kodeMataKuliah: '',
    namaMataKuliah: '',
    nilaiMataKuliah: 'A',
    sksMataKuliah: '0'
  });

  const [student, setStudent] = useState(
    {
        NIMMahasiswa: "",
        namaMahasiswa: "",
    }
  )

  const [errors, setErrors] = useState({});

  const [subjects, setSubjects] = useState(
    Array.from({ length: 10 }, (_, index) => initialSubject(index + 1))
  );

  useEffect(() => {
    console.log('Subjects state updated:', subjects);
  }, [subjects]);

  const handleChangeSubject = (index, e) => {
    const { name, value } = e.target;
    const newSubjects = subjects.map((subject, i) => 
      i === index ? { ...subject, [name]: value } : subject
    );
    setSubjects(newSubjects);
  };

  function handleChangeStudent(e) {
    const { name, value } = e.target
    setStudent(prevStudent => {
        return{
            ...prevStudent,
            [name]: value
        }           
    })
  }

  const hasDuplicateSubjectId = () => {
    const subjectIdSet = new Set();
    for (const subject of subjects) {
      if (subjectIdSet.has(subject.kodeMataKuliah)) {
        return true;
      }
      subjectIdSet.add(subject.kodeMataKuliah);
    }
    return false;
  };

  const hasEmptySubject = () => {
    for (const subject of subjects) {
      const { kodeMataKuliah, namaMataKuliah } = subject;
      if (!kodeMataKuliah || !namaMataKuliah) {
        return true;
      }
    }
    return false;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!student.namaMahasiswa) {
      newErrors.namaMahasiswa = 'Nama Mahasiswa kosong';
    }
    if (!student.NIMMahasiswa) {
      newErrors.NIMMahasiswa = 'NIM Mahasiswa kosong';
    }
    if (hasEmptySubject()) {
      newErrors.subjects = 'Ada Mata Kuliah Kosong';
    }
    if (hasDuplicateSubjectId()) {
      newErrors.subjects = 'Ada Mata Kuliah Dengan Kode Sama';
    }

    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; // Nggak ada error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      const errorMessage = Object.values(errors).join('\n'); 
      alert(`Errors:\n${errorMessage}`);
      return;
    }
  
    try {
      const response = await fetch('https://academic-trascript.azurewebsites.net/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: student.NIMMahasiswa,
          name: student.namaMahasiswa,
          subject_list: subjects.map((subject) => ({
            id: subject.kodeMataKuliah,
            name: subject.namaMataKuliah,
            grade: subject.nilaiMataKuliah,
            credit: subject.sksMataKuliah,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(response.message);
      }
  
      console.log('Success');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
      <form onSubmit={handleSubmit}>
        <div className="transcript-form-container">
            <div className="student-form-container">
                <div>
                    <label htmlFor='namaMahasiswa'>Nama:</label>
                    <input
                    type="text"
                    id='namaMahasiswa'
                    name="namaMahasiswa"
                    value={student.namaMahasiswa}
                    onChange={handleChangeStudent}
                    /> 
                </div>
                <div>
                    <label htmlFor='NIMMahasiswa'>NIM:</label>
                    <input
                    type="text"
                    id='NIMMahasiswa'
                    name="NIMMahasiswa"
                    value={student.NIMMahasiswa}
                    onChange={handleChangeStudent}
                    /> 
                </div>
            </div>
        
          {subjects.map((subject, index) => (
            <div>
            <div key={subject.id} className="subject-form-container">
              <div>
                <label htmlFor={`kodeMataKuliah-${index}`}>Kode Mata Kuliah:</label>
                <input
                  type="text"
                  id={`kodeMataKuliah-${index}`}
                  name="kodeMataKuliah"
                  value={subject.kodeMataKuliah}
                  onChange={(e) => handleChangeSubject(index, e)}
                /> 
              </div>
              <div>
                <label htmlFor={`namaMataKuliah-${index}`}>Nama Mata Kuliah:</label>
                <input
                  type="text"
                  id={`namaMataKuliah-${index}`}
                  name="namaMataKuliah"
                  value={subject.namaMataKuliah}
                  onChange={(e) => handleChangeSubject(index, e)}
                />
              </div>
              <div>
                <label htmlFor={`nilaiMataKuliah-${index}`}>Nilai Mata Kuliah:</label>
                <select 
                    id={`nilaiMataKuliah-${index}`}
                    value={subject.nilaiMataKuliah}
                    onChange={(e) => handleChangeSubject(index, e)}
                    name="nilaiMataKuliah"
                >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
              </div>
              <div>
                <label htmlFor={`sksMataKuliah-${index}`}>SKS Mata Kuliah:</label>
                <input
                  type="number"
                  id={`sksMataKuliah-${index}`}
                  name="sksMataKuliah"
                  value={subject.sksMataKuliah}
                  onChange={(e) => handleChangeSubject(index, e)}
                  min={0}
                />
              </div>
            </div>
          </div>
          ))}
        <br/>
        </div>
        <button type="submit">Submit</button>
      </form>
  );
};

export default InputPage;