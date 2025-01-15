import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import PostDetail from "./components/Posts/PostDetail/PostDetail";
import Search from "./components/Search/Search";
import AddPost from "./components/AddPost/AddPost";
import PrivateZone from "./guards/PrivateZone";
import NotFound from "./components/NotFound/NotFound";
import AddComment from "./components/AddComment/AddComment";

function App() {
  return (
    <>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={
              <PrivateZone>
              <Profile />
            </PrivateZone>
            }/>
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/search/:title" element={<Search />} />
            <Route path="/addPost" element={<AddPost/>} />
            <Route path="/addComment" element={<AddComment/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
