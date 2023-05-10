import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "./components/Todo/TodoPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
