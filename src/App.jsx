import { useState } from 'react';
import InputPage from './pages/InputPage';
import TablePage from './pages/TablePage';
import ValidatePage from './pages/ValidatePage';
import KeyPage from './pages/KeyPage';
import PDFPage from './pages/PDFPage';
import './App.css';

function App() {
 const [page, setPage] = useState('InputPage');

 return (
   <div className="app">
     <header className="header">
       <nav className="nav">
         <button
           className="nav-button"
           onClick={() => setPage('InputPage')}
         >
           Input Page
         </button>
         <button
           className="nav-button"
           onClick={() => setPage('TablePage')}
         >
           Table Page
         </button>
         <button
           className="nav-button"
           onClick={() => setPage('ValidatePage')}
         >
           Validate Page
         </button>
         <button
           className="nav-button"
           onClick={() => setPage('KeyPage')}
         >
           Key Page
         </button>
         <button
           className="nav-button"
           onClick={() => setPage('PDFPage')}
         >
           PDF Page
         </button>
       </nav>
     </header>
     <div className="page-container">
       {(page === 'InputPage') && <InputPage />}
       {(page === 'TablePage') && <TablePage />}
       {(page === 'ValidatePage') && <ValidatePage />}
       {(page === 'KeyPage') && <KeyPage />}
       {(page === 'PDFPage') && <PDFPage />}
     </div>
   </div>
 );
}

export default App;