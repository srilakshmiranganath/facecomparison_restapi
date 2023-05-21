import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Register from "./pages/Register";
import Attendance from "./pages/Attendance";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));