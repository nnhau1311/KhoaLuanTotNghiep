import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import PrivacyPolicy from "./privacy/PrivacyPolicy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/stepbystep/PrivacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
