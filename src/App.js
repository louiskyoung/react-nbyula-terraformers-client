import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';
import Welcome from './modules/home/Welcome';
import Login from './modules/auth/Login';
import Register from './modules/auth/Register';
import Error404 from './modules/Error404';
import PostJob from './modules/jobs/PostJob';
import {
  getUserInfo,
  selectIsLoggedIn,
  selectIsTerraformer,
} from './modules/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isTerraformer = useSelector(selectIsTerraformer);

  React.useEffect(() => {
    if (localStorage.token) {
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  function renderGuestRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    );
  }

  function renderUserRoutes() {
    return (
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/jobs" element={<Welcome />} />
        {isTerraformer && <Route path="/jobs/post" element={<PostJob />} />}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    );
  }

  return (
    <Router>
      <Header />
      <main className="bg-white dark:bg-gray-900">
        {!isLoggedIn ? renderGuestRoutes() : renderUserRoutes()}
      </main>
    </Router>
  );
}

export default App;
