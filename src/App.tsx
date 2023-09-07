import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import FormPage1 from './components/FormPage1';
import FormPage2 from './components/FormPage2';
import SummaryPage from './components/SummaryPage';
import styled from 'styled-components';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    salary: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const location = useLocation();
  let progress = 0;
  let pageName = '';

  switch (location.pathname) {
    case '/':
      progress = 33.33;
      pageName = 'Page 1: Personal Info';
      break;
    case '/page2':
      progress = 66.66;
      pageName = 'Page 2: Additional Details';
      break;
    case '/summary':
      progress = 100;
      pageName = 'Summary';
      break;
    default:
      progress = 0;
      pageName = '';
  }

  return (
    <AppContainer>
      <ProgressBar max="100" value={progress}></ProgressBar>
      <PageName>{pageName}</PageName>
      <Routes>
        <Route
          path="/"
          element={
            <FormPage1
              formData={formData}
              handleInputChange={handleInputChange}
            />
          }
        />
        <Route
          path="/page2"
          element={
            <FormPage2
              formData={formData}
              handleInputChange={handleInputChange}
            />
          }
        />
        <Route
          path="/summary"
          element={<SummaryPage formData={formData} />}
        />
      </Routes>
    </AppContainer>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ProgressBar = styled.progress`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  appearance: none;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const PageName = styled.div`
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
`;

export default AppWithRouter;
