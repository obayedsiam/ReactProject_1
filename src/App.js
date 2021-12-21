//import logo from "./logo.svg";
import "./App.css";
import { Button, Row, Col, Container, Carousel } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import Allcourses from "./components/Allcourses";
import AddCourse from "./components/AddCourse";
import Header from "./components/Header";
import Menus from "./components/Menus";
import EditCourse from "./components/EditCourse";
import Login from "./components/Login";
//import ExampleHeader from "./components/ExampleHeader";
//import CarouselEx from "./components/CarouselEx";
//import { Card } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import ImageList from "./components/ImageList";
//import MyAccount from "./components/MyAccount";
import { Link } from "react-router-dom";


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
            <Col md={2} > 
       
            <Link to={`/`}>
            <img src="e_shop_logo.jpg" alt="Sample Image" width = "100%" height="60%" style = {{paddingTop : "70px"}}/>
            </Link>
          
          
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
              <Route path="/login" component={Login} exact />
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  );

  // return (
  //   <>
  //     <Router>
  //       <Container>
  //         <Route path="/myAccount" component={MyAccount} exact />
  //         <ExampleHeader />
  //         <Row>
  //           <Col md={8}>
  //             <Card className="my-2 bg-black">
  //               <CarouselEx />
  //             </Card>
  //           </Col>
  //           <Col md={4}>
  //             <Home />
  //           </Col>
  //         </Row>
  //         <Row>
  //           <ImageList />
  //         </Row>
  //       </Container>
  //     </Router>
  //   </>
  // );
}

export default App;
