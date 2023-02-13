import React, { Component } from "react";
// import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryList from "./InventoryList";
import InventoryEdit from "./InventoryEdit";
import "./App.css";

class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          {/* <Route path='/' exact element={<Home />} /> */}
          <Route path='/' exact element={<InventoryList />} />
          <Route path='/books/:id' element={<InventoryEdit />} />
        </Routes>
      </Router>
    )
  }
}

export default App;
