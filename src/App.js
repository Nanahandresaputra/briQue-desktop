import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FinancialService from "./pages/financial-service";
import GetPhoto from "./pages/get-photo";
import Testing from "./pages/test-test/test";
import MultiForm from "./pages/multi-form";
import Eform from "./pages/e-form";
import BookingSuccess from "./pages/booking-success";
import QueuePrint from "./components/queue-print";
import Loading from "./components/loading/index";
import { useSelector } from "react-redux";

function App() {
  const { isGetLoading } = useSelector((state) => state.briQueReducer);

  let { branchCode } = localStorage;

  return (
    <Loading isGetLoading={isGetLoading}>
      <section className="flex h-screen items-center justify-center">
        <div
          className="h-[768px] w-[1024px]  overflow-auto"
          style={{
            backgroundImage: `url(./assets/svg/background.svg)`,
          }}
        >
          <Router>
            <Routes>
              <Route path="/brique" element={<Home />} />
              <Route path="/brique/:id" element={<FinancialService />} />
              <Route path="/foto-nasabah" element={<GetPhoto />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="/multi-form" element={<MultiForm outletCode={branchCode} />} />
              <Route path="/eform/:id" element={<Eform outletCode={branchCode} />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/print-view" element={<QueuePrint />} />
            </Routes>
          </Router>
        </div>
      </section>
    </Loading>
  );
}

export default App;
