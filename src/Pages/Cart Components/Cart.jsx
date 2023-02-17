import React, { useState } from 'react'
import CartCard from './CartCard';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { onSnapshot } from 'firebase/firestore';


const Cart = ({ user }) => {
  const [cartList, setCartList] = useState([])
  let newlist = [];
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users', user?.uid, 'cart'),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          newlist.push({ id: doc.id, ...doc.data() })
        });
        setCartList(newlist)
        // console.log(cartList);
      }, (error) => {
        console.log(error)
      }
    )

    return () => {
      unsub();
    }
  }, [cartList])

  const handleClick = async (prodID) => {
    // :TODO 
    toast.warning(`[TODO] - Removed from cart`)
    
  }

  return (
    <>
      <div className='div-2'>
        <div className="product-container">
          {cartList.map((product) => {
            return (
              <CartCard key={product.id} product={product} handleClick={handleClick} />
            )
          }
          )}
        </div>
      </div>
    </>
  )
}

export default Cart