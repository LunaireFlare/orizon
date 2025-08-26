import { Routes, Route } from 'react-router';
import BackOfficeUsersPage from './Page/BackOfficePage/BackOfficeUsersPage.tsx';
import BackOfficeEventsPage from './Page/BackOfficePage/BackOfficeEventsPage.tsx';
import './App.scss'

function App() {

  return (
        <div>
            <Routes>
              <Route path="/" element={<BackOfficeUsersPage />} />
              <Route path="/evenements" element={<BackOfficeEventsPage />} />
            </Routes>
        </div>
  )
}

export default App
