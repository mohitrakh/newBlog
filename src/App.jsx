import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Write from "./pages/Write";
import SingleBlog from "./pages/SingleBlog";
function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/blog/:blogId" element={<SingleBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:username" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
