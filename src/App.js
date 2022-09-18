import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Welcome from './modules/home/Welcome';

function App() {
  return (
    <Router>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-[calc(100vh-62px)]">
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
