import React from 'react';
import {Jumbotron, Container, Button} from 'reactstrap';
import SingleProduct from "./Product/SingleProduct";
import Header from "./Header";
const Home = (title, name) =>{
   
   return (
     <div>
       <Jumbotron > 
         {/* <h1>Welcome to my Course</h1>
         <p>This is a website for Online Learning Platform</p> */}

         <Container>
   
           <SingleProduct/>
      
           {/* <Button color="primary" outline>
             Profile
           </Button> */}
<>
</>

         </Container>
       </Jumbotron>
     </div>
   );
   
}

export default Home;