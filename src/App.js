import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FinancialService from "./pages/financial-service";
import GetPhoto from "./pages/get-photo";
import Testing from "./pages/test-test/test";
import MultiForm from "./pages/multi-form";
import Eform from "./pages/e-form";
import BookingSuccess from "./pages/booking-success";
import QueuePrint from "./components/queue-print";
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
            <Route path="/:id" element={<FinancialService />} />
            <Route path="/foto-nasabah" element={<GetPhoto />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/multi-form" element={<MultiForm />} />
            <Route path="/eform/:id" element={<Eform />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/print-view" element={<QueuePrint />} />
          </Routes>
        </Router>
      </div>
    </section>
  );
}

export default App;
