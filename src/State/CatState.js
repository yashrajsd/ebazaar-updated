import CatContext from "./catContext";
import { useState } from "react";

const CatState = (props) => {
    let categoryString = ""
    const [cat, setCat] = useState(categoryString)
    const [categoryProduct, setCategoryProduct] = useState()
    const changeCat = (type) => {
        setCat(type)
        console.log("Clicked and type is" + type);

    }
    // console.log(cat);

    return (
        <CatContext.Provider value={{ changeCat , cat}}>
            {props.children}
        </CatContext.Provider>
    )
}

export default CatState;