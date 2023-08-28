import {Spinner} from "react-bootstrap";

const Loader = ()=>{
    return(
        <Spinner
          animation="grow"
          size="sm"
          role="status"
          style={{
            width:"100px",
            height:"100px",
            margib:"auto",
            display:"block"
          }}
        />
    )
}

export default Loader;