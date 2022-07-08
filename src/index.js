import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Animation,
  Shoe,
  About,
  Contact,
} from "./components";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animation" element={<Animation />} />
      <Route path="/shoe" element={<Shoe />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
  </Router>
);

serviceWorker.unregister();