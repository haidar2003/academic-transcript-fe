import { useState } from 'react';
import InputPage from './pages/InputPage';
import TablePage from './pages/TablePage';
import ValidatePage from './pages/ValidatePage';
import KeyPage from './pages/KeyPage';
import './App.css';

function App() {
  const [page, setPage] = useState('InputPage');

  return (
    <div className='App'>
      <header style={{backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'space-between', padding: '10px', fontWeight: 'bold'}}>
          <button onClick={() => setPage('InputPage')}>Input Page</button>
          <button onClick={() => setPage('TablePage')}>Table Page</button>
          <button onClick={() => setPage('ValidatePage')}>Validate Page</button>
          <button onClick={() => setPage('KeyPage')}>Key Page</button>
      </header>
      <div className='page'>
        {(page === 'InputPage') && <InputPage />}
        {(page === 'TablePage') && <TablePage />}
        {(page === 'ValidatePage') && <ValidatePage />}
        {(page === 'KeyPage') && <KeyPage />}
      </div>
    </div>
  );
}

export default App;
