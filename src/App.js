import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Welcome from './modules/home/Welcome';
import Login from './modules/auth/Login';
import Register from './modules/auth/Register';

function App() {
  return (
    <Router>
      <Header />
      <main className="bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
