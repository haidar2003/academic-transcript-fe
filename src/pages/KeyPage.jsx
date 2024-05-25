import React, { useState, useEffect } from 'react';
import './KeyPage.css';

function KeyPage() {
 const [isKeyGenerated, setIsKeyGenerated] = useState(false);
 const [showKey, setShowKey] = useState(false);
 const [key, setKey] = useState({
   id: null,
   exponent_pri: null,
   exponent_pub: null,
   modulus: null,
 });

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await fetch('https://academic-trascript.azurewebsites.net/key');

       if (!response.ok) {
         throw new Error('Gagal mengambil key');
       }

       const data = await response.json();
       setKey(data);
     } catch (error) {
       console.error('Error:', error);
     }
   };

   fetchData();
 }, [isKeyGenerated]);

 const handleKeyGen = async (e) => {
   e.preventDefault();

   try {
     const response = await fetch('https://academic-trascript.azurewebsites.net/key/generate');

     if (!response.ok) {
       throw new Error('Gagal membuat Key');
     }

     setIsKeyGenerated(!isKeyGenerated);
   } catch (error) {
     console.error('Error:', error);
   }
 };

 const handleShowKey = (e) => {
   setShowKey(!showKey);
 };

 return (
   <div className="key-page">
     <div className="button-container">
       <button onClick={handleKeyGen} className="generate-button">
         Bangkitkan Kunci
       </button>
       <button onClick={handleShowKey} className="show-key-button">
         {showKey ? 'Sembunyikan Kunci' : 'Tampilkan Kunci'}
       </button>
     </div>
     {showKey && (
       <div className="key-container">
         <h3 className="key-item">e: {key.exponent_pub}</h3>
         <h3 className="key-item">d: {key.exponent_pri}</h3>
         <h3 className="key-item">n: {key.modulus}</h3>
       </div>
     )}
   </div>
 );
}

export default KeyPage;