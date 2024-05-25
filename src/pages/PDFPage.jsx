import React, { useState, useEffect } from 'react';
import './PDFPage.css';

function PDFPage() {
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
     body: formData
   })
   .then((response) => {
     return response.blob();
   })
   .then(blob => {
     saveAs(blob, "Decrypted.pdf");
   });
 };

 return (
   <div className="pdf-page">
     <div className="file-input-container">
       <label htmlFor="file-input" className="file-input-label">
         Select a file:
       </label>
       <input
         id="file-input"
         type="file"
         onChange={handleFileChange}
         className="file-input"
       />
     </div>
     <button onClick={handleDecryptPDF} className="decrypt-button">
       Unduh PDF
     </button>
   </div>
 );
}

export default PDFPage;