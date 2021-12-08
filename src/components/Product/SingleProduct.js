
import {Button} from "reactstrap";
import watch from "./ProductImage/watch.jpg";
import "./Product.css";
import {useState, useEffect} from "react";
const SingleProduct = () =>{

const [mouseEntry, setMouseEntry] = useState(false);

let classN =  "text-center bg margin product-shape";

useEffect(() => {
  console.log("useEffect");
 
},[mouseEntry])

    return (
        <div className= { (mouseEntry==true) ? "text-center bg margin product-shape hover" : "text-center bg margin product-shape" }
                onClick={()=>{console.log("clicked")}}
                onMouseEnter={()=>{
                  console.log("Mouse Entered");
                  setMouseEntry(true);
                  }}
                onMouseLeave={()=>{
                  console.log("Mouse left");
                  setMouseEntry(false);
                }}
        >
              
              <div  ><img src={watch} alt="Sample Image" height="130" /></div>
              { (mouseEntry==true) ? 
                 <Button className= "text-center hover-place"  >Add to Cart</Button>
                  : 
                  <div className= "text-center hover-place">
                 $19.99
               </div> }
             
              <div>
                <h4>Casio</h4>
                <p>Lorem ipsum</p>
              </div>
         

          
             {/* <Button>Add to Cart</Button> */}
        </div>
            )
}

export default SingleProduct;

