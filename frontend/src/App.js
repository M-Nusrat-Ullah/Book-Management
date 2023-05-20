import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/search" element={<Search />} />
			</Routes>
    </div>
  );
}

export default App;
