import React, { useContext, useState } from 'react'
import './FarmsNavbar.scss'
import Product from './Product'
import {handleClick} from '../Farms'
import catContext from '../../State/catContext';


const FarmsNavbar = () => {
  let type = "default from nav";
  const context = useContext(catContext);
  const [products, setProducts] = useState([])
  const [categoryProduct, setCategoryProduct] = useState([])
  const [category, setCategory] = useState('')
  const {changeCat} = context;




  const handle1 = () => {
    setCategory('vegetables')
    changeCat('Vegetables')
    setCategoryProduct(products.filter(product => product.category == 'Vegetables'))
    
  }
  const handle2 = () => {
    setCategory('fruits')
    changeCat('Fruits')
    setCategoryProduct(products.filter(product => product.category == 'Fruits'))
  }
  const handle3 = () => {
    setCategory('poultry')
    changeCat('Poultry Items')
    setCategoryProduct(products.filter(product => product.category == 'Poultry Items'))
  }
  const handle4 = () => {
    setCategory('dairy')
    changeCat('Dairy')
    setCategoryProduct(products.filter(product => product.category == 'Dairy Items'))
  }
  return (
    <>
      <div className='farm-navbar container'>
        <div className='farm-nav row'>
          {/* <p>Categories</p> */}

          <ul className='col-md-7 col-lg-6 col-sm-12'>
            <li onClick={handle1} className={`${category === 'vegetables' && 'activeCategory'}`} >Vegetables</li>
            <li onClick={handle2} className={`${category === 'fruits' && 'activeCategory'}`} >Fruits</li>
            <li onClick={handle3} className={`${category === 'poultry' && 'activeCategory'}`} >Poultry Items</li>
            <li onClick={handle4} className={`${category === 'dairy' && 'activeCategory'}`}>Dairy Items</li>
          </ul>
          <input className='col-md-7 col-lg-5 col-sm-12' type="search" placeholder='Search' />
        </div>
      </div>
    </>
  )
}

export default FarmsNavbar