import logo from "./logo.svg";
import "./App.css";
import { Button, Row, Col, Container } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import Allcourses from "./components/Allcourses";
import AddCourse from "./components/AddCourse";
import Header from "./components/Header";
import Menus from "./components/Menus";
import EditCourse from "./components/EditCourse";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const btnHandler = () => {
    toast.success("Done");
    toast.error("Undone");
  };

  return (
    <>
      <Router>
        <Container>
          {/* <Header></Header> */}

          <Row>
            <Col md={2}>
        
            </Col>
            <Col md={10}> 
              <Header></Header>
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <Menus />
            </Col>
            <Col md={10}> 
              {/* <Header></Header> */}
              <Route path="/" component={Home} exact />
              <Route path="/add-course" component={AddCourse} exact />
              <Route path="/view-course" component={Allcourses} exact />
              <Route path="/edit-course/:id" component={EditCourse} exact />
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;
