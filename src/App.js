import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FinancialService from "./pages/financial-service";
function App() {
  return (
    <section
      className="max-h-[768px] max-w-[1024px] h-[768px] overflow-auto"
      style={{
        backgroundImage: `url(./assets/svg/background.svg)`,
      }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/layanan-finansial" element={<FinancialService />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;
