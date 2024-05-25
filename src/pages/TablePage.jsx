import React, { useState, useEffect } from 'react';
import './TablePage.css';
import { saveAs } from 'file-saver';

function TablePage() {
    const [transcripts, setTranscripts] = useState([]);
    const [selectedEndpoint, setSelectedEndpoint] = useState(
      'https://academic-trascript.azurewebsites.net/transcript'
    );
    const [showDownload, setShowDownload] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(selectedEndpoint);
          if (!response.ok) {
            throw new Error('Failed to fetch transcripts');
          }
          const data = await response.json();
          setTranscripts(data.transcript_list);
        } catch (error) {
          console.error('Error fetching transcripts:', error);
        }
      };
  
      fetchData();
    }, [selectedEndpoint]); 
  
    const handleEndpointChange = (newEndpoint, isDownloadable) => {
      setSelectedEndpoint(newEndpoint);
      setShowDownload(isDownloadable)
    };
  
    const handeDownloadPDF = (nim) => {
      const response = fetch("https://academic-trascript.azurewebsites.net/pdf/encrypted" , {
        method : "POST",
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({nim : nim})
      }).then((response) => {
        return  response.blob();
      }).then(blob => {
        saveAs(blob, "Output")
      })

    }
    return (
    <div>
        <div className="button-container">
          <button onClick={() => handleEndpointChange('https://academic-trascript.azurewebsites.net/transcript', true)}>
            Tidak Dienkripsi
          </button>
          <button onClick={() => handleEndpointChange('https://academic-trascript.azurewebsites.net/transcript/encrypted', false)}>
            Enkripsi Semua Kecuali Tanda Tangan
          </button>
          <button onClick={() => handleEndpointChange('https://academic-trascript.azurewebsites.net/transcript/encrypted/all', false)}>
            Enkripsi Semua
          </button>
        </div>
    <table className="transcript-table">
      <thead>
        <tr>
          <th className="column">Unduh PDF</th>
          <th className="column">NIM</th>
          <th className="column">Nama</th>
          {Array.from({ length: 10 }, (_, i) => (
            <>
            <th key={`subject-${i + 1}`} className="column">
              {`Kode Mata Kuliah ${i + 1}`}
            </th>
            <th key={`subject-${i + 1}-name`} className="column">
            {`Nama Mata Kuliah ${i + 1}`}
           </th>
           <th key={`subject-${i + 1}-grade`} className="column">
              Nilai Mata Kuliah {i + 1}
            </th>
            <th key={`subject-${i + 1}-sks`} className="column">
              SKS Mata Kuliah {i + 1}
            </th>
           </>
          ))}
          <th className="column">IPK</th>
          <th className="column">Tanda Tangan</th>
        </tr>
      </thead>
      <tbody>
        {transcripts.map((transcript) => (
          <tr key={transcript.id}>
            {showDownload ? 
              <td className="column"> <button onClick={ () => (handeDownloadPDF(transcript.transcript.id))}>Unduh PDF</button></td> : 
              <td className="column"><p style={{fontWeight: "bold"}}>Ubah Ke mode 'Tidak Dienkripsi'</p></td>
            }
            <td className="column">{transcript.transcript.id}</td>
            <td className="column">{transcript.transcript.name}</td>
            {transcript.transcript.subject_list.map((subject) => (
              <React.Fragment key={subject.id}>
                <td className="column">{subject.id}</td>
                <td className="column">{subject.name}</td>
                <td className="column">{subject.grade}</td>
                <td className="column">{subject.credit}</td>
              </React.Fragment>
            ))}
            <td className="column">{transcript.gpa}</td>
            <td className="column signature">{transcript.signature}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default TablePage;