import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage } from "./pages";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/detail/:touristRouteId/:other"
            element={<DetailPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
