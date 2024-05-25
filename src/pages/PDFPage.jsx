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
      formData.append("request", file);
  
      fetch("https://academic-trascript.azurewebsites.net/pdf/decrypted", {
        method: 'POST',
        body: formData // , headers:  { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        return  response.blob();
      }).then(blob => {
        saveAs(blob, "Decrypted.pdf")
      })
    };
    return ( <div> 
      <input type="file" onChange={ (event) => handleFileChange(event)} />
      <button onClick={ () =>( handleDecryptPDF())}>Unduh PDF</button> </div>)
}

export default PDFPage