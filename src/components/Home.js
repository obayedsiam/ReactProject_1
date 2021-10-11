import React from 'react';
import {Jumbotron, Container, Button} from 'reactstrap';

const Home = (title, name) =>{
   
   return (
     <div>
       <Jumbotron className="text-center">
         <h1>Welcome to my Course</h1>
         <p>This is a website for Online Learning Platform</p>

         <Container>
           <Button color="primary" outline>
             Profile
           </Button>
         </Container>
       </Jumbotron>
     </div>
   );
   
}

export default Home;