import logo from "./logo.svg";
import "./App.css";
import { Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import Allcourses from "./components/Allcourses";

function App() {
  const btnHandler = () => {
    toast.success("Done");
    toast.error("Undone");
  };

  return (
    <div>
      <ToastContainer />
      <Home />
      <Allcourses />
    </div>
  );
}

export default App;
