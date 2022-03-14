import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Form from "./components/Form";
import IssueDetails from "./components/IssueDetails";
import UpdateIssue from "./components/UpdateIssue";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Form/>} />
          <Route exact path = "/issues" element = {<IssueDetails/>} />
          <Route exact path = "/updateissue/:id" element = {<UpdateIssue/>} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
