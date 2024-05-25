import React, { useState, useEffect } from 'react';




function PDFPage(){
    const [file, setFile] = useState(null);
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleDecryptPDF = () => {
      if (!file) {
        alert("Please select a file");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      fetch("https://academic-trascript.azurewebsites.net/pdf/decrypted", {
        method: 'POST',
        body: formData, headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to upload file");
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file_decrypted.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    return (<button onClick={handeDownloadPDF()}>Unduh PDF</button>)
}

export default PDFPage