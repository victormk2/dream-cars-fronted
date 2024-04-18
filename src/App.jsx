import { useState } from "react";
import AppRoutes from "./routes.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App background-def">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
