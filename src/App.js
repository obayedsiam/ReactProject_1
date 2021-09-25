import logo from './logo.svg';
import './App.css';
import {Button} from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'

function App() {

  const btnHandler = () =>{
      toast.success("Done");
      toast.error("Undone");
  }


  return (
    <div >
    <ToastContainer/>
    <h1>Online Learning Platform</h1>   
     <Button color = "primary" onClick = {btnHandler}>
      Click 
     </Button>
    </div>
  );
}

export default App;
 