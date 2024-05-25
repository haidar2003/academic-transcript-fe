import React, { useState } from 'react';
import './ValidatePage.css';

function ValidatePage() {
 const [signature, setSignature] = useState({
   signature_type: 'decrypted',
   signature: '',
   id: '',
 });
 const [result, setResult] = useState('');

 const handleSignatureChange = (e) => {
   const { name, value } = e.target;
   setSignature((prevSignature) => ({ ...prevSignature, [name]: value }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch(
       'https://academic-trascript.azurewebsites.net/signature',
       {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(signature),
       }
     );
     const data = await response.json();
     setResult(data.result);
   } catch (error) {
     console.error('Error:', error);
     setResult('ERROR: MASUKAN TIDAK VALID');
   }
 };

 return (
   <div className="validate-form">
     <form onSubmit={handleSubmit} className="form-container">
       <div className="encryption-options">
         <label className="radio-label">
           <input
             type="radio"
             id="radio-encrypted"
             name="signature_type"
             value="encrypted"
             checked={signature.signature_type === 'encrypted'}
             onChange={handleSignatureChange}
             className="radio-input"
           />
           Encrypted
         </label>
         <br />
         <label className="radio-label">
           <input
             type="radio"
             id="radio-decrypted"
             name="signature_type"
             value="decrypted"
             checked={signature.signature_type === 'decrypted'}
             onChange={handleSignatureChange}
             className="radio-input"
           />
           Decrypted
         </label>
       </div>
       <div className="input-container">
         <label htmlFor="id" className="input-label">
           NIM
         </label>
         <input
           type="text"
           id="id"
           name="id"
           value={signature.id}
           onChange={handleSignatureChange}
           className="input-field"
         />
       </div>
       <div className="input-container">
         <label htmlFor="signature" className="input-label">
           Tanda Tangan
         </label>
         <textarea
           id="signature"
           name="signature"
           value={signature.signature}
           onChange={handleSignatureChange}
           rows={5}
           cols={40}
           className="textarea-field"
         />
       </div>
       <button type="submit" className="submit-button">
         Validasi
       </button>
     </form>
     {result && <p className="validation-result">{result}</p>}
   </div>
 );
}

export default ValidatePage;