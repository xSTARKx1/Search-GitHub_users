// External
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Internal
import { SearchUsers, UserInfo } from './index';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/"  element={<SearchUsers />}/>
              <Route path="/:id" element={<UserInfo />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
