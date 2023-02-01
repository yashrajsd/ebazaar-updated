import React, { useState, useContext } from 'react'
import FarmsNavbar from './Farms Components/FarmsNavbar'
import './Farms.scss'
import Product from './Farms Components/Product'
import { toast } from 'react-toastify';

import { useParams } from 'react-router'
import { useEffect } from 'react';
import { collection, doc, getDocs, setDoc, } from 'firebase/firestore';
import { db } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import { async } from '@firebase/util';
import catContext from '../State/catContext';


const Farms = ({ user }) => {
  const productCollectionRef = collection(db, 'products');
  const { id } = useParams()
  const [farm, setFarm] = useState([])
  const [products, setProducts] = useState([])
  const context = useContext(catContext);
  const { cat, changeCat } = context;
  const [categoryProduct, setCategoryProduct] = useState([])

  let list = [];
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
          setProducts(list)
          setCategoryProduct(list)
        });
      }, (error) => {
        console.log(error)
      }

    )
    return () => {
      unsub();
    }
  }, [])

  // console.log(categoryProduct);


  const [category, setCategory] = useState()
  return (
    <>
      <div className='farms-container'>
        <FarmsNavbar />
        <div className='div-2'>
          <div className="product-container">
            {categoryProduct.map((product) => {
              return (
                <Product key={product.id} product={product} farm={farm} />
              )
            }
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Farms