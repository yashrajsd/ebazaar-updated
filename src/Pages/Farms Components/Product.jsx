import React from 'react'
import './Product.scss'
export default function Product(props) {
    const { product} = props;
    // const { product} = props;
    const { farm} = props;

    return (
        
        <>
            <div className='product-card'>
              <div className='card'>
                <div className='card-div-1'>
                  <img src={product.itemImageUrl} alt="" />
                </div>
                <div className='card-div-2'>
                <div style={{margin:'10px 10px'}}>
                <p className='price'>Rs.{product.price}</p>
                  <p className='title'>{product.title}</p>
                  <p className='like-status'>liked by 6</p>
                  <div className='cart-view'>
                    <button>View Item</button>
                    <p id={product.id} name={product.farm}>add to cart</p>
                  </div>
                  <p style={{textAlign:'center',marginTop:'10px',fontSize:'10px'}}>produced by {farm?.farmName}</p>
                </div>
                </div>
              </div>
            </div>
        </>
    )
}
