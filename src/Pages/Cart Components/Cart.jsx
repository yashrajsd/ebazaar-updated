import React, { useState } from 'react'
import CartCard from './CartCard';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { onSnapshot } from 'firebase/firestore';


const Cart = ({ user }) => {
  const [products, setProducts] = useState([])
  const [cartList, setCartList] = useState([])
  let list = [];
  let newlist = [];
  let tlist=[];
  useEffect(() => {
    console.log('rendering')
    const unsub = onSnapshot(
      collection(db, 'users', user?.uid, 'cart'),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          newlist.push({ id: doc.id, ...doc.data() })
        });
        setCartList(newlist)
      }, (error) => {
        console.log(error)
      }
    )

    // console.log(cartList)
    // const getCartProducts = () => {
    //   console.log("getCartProducts")
    //   newlist.map(cartProduct => {
    //     console.log(cartProduct.id)
    //     const docRef = doc(db, 'products', cartProduct.id);

    //     getDoc(docRef)
    //       .then((doc) => {
    //         console.log(doc.data())
    //         list.push({ id: doc.id, ...doc.data() })
    //         setProducts(list)
    //       })
    //   });
    // }

    return () => {
      unsub();
      // getCartProducts();
    }
  }, [])


  const handleClick = async (prodID) => {
    // :TODO 
    toast.warning(`Removed from cart`)
  }

  const getCartProducts = () => {
      console.log(cartList)
      console.log("getCartProducts")
      newlist.map(cartProduct => {
        console.log(cartProduct.id)
        const docRef = doc(db, 'products', cartProduct.id);

        getDoc(docRef)
          .then((doc) => {
            console.log(doc.data())
            list.push({ id: doc.id, ...doc.data() })
            setProducts(list)
          })
      });

      return (
        <>
          <div className='div-2'>
            <div className="product-container">
            <button onClick={handleRefresh} className="refresh">refresh</button>
              {products.map((product) => {
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

  const handleRefresh = () => {
    console.log('refreshing');
    getCartProducts();

  }


  return (
    <>
      <div className='div-2'>
        <div className="product-container">
        <button onClick={handleRefresh} className="refresh">refresh</button>
          {/* {products.map((product) => {
            return (
              <CartCard key={product.id} product={product} handleClick={handleClick} />
            )
          }
          )} */}
        </div>
      </div>
    </>
  )
}

export default Cart