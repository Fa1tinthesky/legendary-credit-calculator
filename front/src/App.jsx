import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <Routes>
            <Route path='/' element={<HomePage>jdflksajflksaj f</HomePage>}></Route> 
            <Route path='*' element={<h1>404. Not found</h1>}></Route> 
            <Route path="/login" element={<ProfilePage></ProfilePage>}></Route>
        </Routes>
      </Router>
  )
}

export default App
