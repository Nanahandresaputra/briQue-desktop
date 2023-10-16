import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FinancialService from "./pages/financial-service";
import GetPhoto from "./pages/get-photo";
function App() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div
        className="h-[768px] w-[1024px]  overflow-auto"
        style={{
          backgroundImage: `url(./assets/svg/background.svg)`,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layanan-finansial" element={<FinancialService />} />
            <Route path="/foto-nasabah" element={<GetPhoto />} />
          </Routes>
        </Router>
      </div>
    </section>
  );
}

export default App;
