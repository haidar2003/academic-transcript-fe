import React, { useState, useEffect } from 'react';
import './TablePage.css';

function TablePage() {
    const [transcripts, setTranscripts] = useState([]);
    const [selectedEndpoint, setSelectedEndpoint] = useState(
      'https://academic-trascript.azurewebsites.net/transcript/encrypted/all'
    );
  
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
  
    const handleEndpointChange = (newEndpoint) => {
      setSelectedEndpoint(newEndpoint);
    };
  
    return (
    <div>
        <div className="button-container">
          <button onClick={() => handleEndpointChange('https://academic-trascript.azurewebsites.net/transcript')}>
            Standard
          </button>
          <button onClick={() => handleEndpointChange('https://academic-trascript.azurewebsites.net/transcript/encrypted')}>
            Encrypt Partially
          </button>
          <button onClick={() => handleEndpointChange('https://academic-trascript.azurewebsites.net/transcript/encrypted/all')}>
            Encrypt All
          </button>
        </div>
    <table className="transcript-table">
      <thead>
        <tr>
          <th className="column">NIM</th>
          <th className="column">Nama</th>
          {Array.from({ length: 10 }, (_, i) => (
            <th key={`subject-${i + 1}`} className="column">
              {`Kode Mata Kuliah ${i + 1}`}
            </th>
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <th key={`subject-${i + 1}-name`} className="column">
              {`Nama Mata Kuliah ${i + 1}`}
            </th>
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <th key={`subject-${i + 1}-grade`} className="column">
              Nilai Mata Kuliah {i + 1}
            </th>
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <th key={`subject-${i + 1}-sks`} className="column">
              SKS Mata Kuliah {i + 1}
            </th>
          ))}
          <th className="column">IPK</th>
          <th className="column">Tanda Tangan</th>
        </tr>
      </thead>
      <tbody>
        {transcripts.map((transcript) => (
          <tr key={transcript.id}>
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