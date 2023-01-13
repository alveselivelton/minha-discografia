import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConfig";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// context
import { AuthContextProvider } from "./context/AuthContext";

import "./styles/global.scss";

function App() {
  const [user, setUser] = useState(undefined);

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <Loading />;
  }
  return (
    <div className="App">
      <AuthContextProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
