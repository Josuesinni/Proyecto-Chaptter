import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col h-full min-h-0">
        <Navbar />
        <div className="flex-1 min-h-0">
          <div className="h-full flex flex-col-reverse md:flex-row">
            <main className="w-full min-h-0 h-full max-h-full overflow-hidden">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
