
import {Button} from "reactstrap";
import watch from "./ProductImage/watch.jpg";
const SingleProduct = () =>{
    return (
        <div  onClick={()=>{
            console.log("clicked")
        }}>
              <div >
                <img src={watch} alt="Sample Image" height="130" />
              </div>
              <div >
                $19.99
              </div>
              <div>
                <h4>Casio</h4>
                <p>Lorem ipsum Watch</p>
              </div>
             <Button>Add to Cart</Button>
            </div>
            )
}

export default SingleProduct;

