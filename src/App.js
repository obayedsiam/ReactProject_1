//import logo from "./logo.svg";
import "./App.css";
import { Button, Row, Col, Container, Carousel } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import Allcourses from "./components/Allcourses";
import AddFile from "./components/AddFile";
import AddCourse from "./components/AddDetails";
import Header from "./components/Header";
import Menus from "./components/Menus";
import EditCourse from "./components/EditCourse";
import Login from "./components/Login";
import Search from "./components/Search";
//import ExampleHeader from "./components/ExampleHeader";
//import CarouselEx from "./components/CarouselEx";
//import { Card } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import ImageList from "./components/ImageList";
//import MyAccount from "./components/MyAccount";
import { Link } from "react-router-dom";
import TvDetails from "./components/TvDetails";

function App() {
  const imgs = [
    "https://res.cloudinary.com/stealthman22/image/upload/v1586308024/new-portfolio/hero/time-lapse-photography-of-waterfalls-during-sunset-210186.jpg",
    "https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg",
  ];
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
            <Col>
              <Link to={`/`}>
                <img
                  src="akashLogo.jpg"
                  alt="Sample Image"
                  width="30%"
                  height="80%"
                  style={{ className: "text-center" }}
                />
              </Link>
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
              <Route path="/add-file" component={AddFile} exact />
              <Route path="/search" component={Search} exact />
              <Route
                path="/edit/:serial/:mobile/:date/:call/:id"
                component={TvDetails}
                exact
              />
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;
