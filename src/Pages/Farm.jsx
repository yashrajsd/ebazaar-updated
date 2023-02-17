import React, { useState } from 'react'
import farmer from '../images/farmerprp.png'
import './Farm.scss'
import { useParams } from 'react-router'
import { useEffect } from 'react';
import { collection, doc, getDoc, setDoc,} from 'firebase/firestore';
import { db } from '../firebase';
import InfoIcon from '@mui/icons-material/Info';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { onSnapshot } from 'firebase/firestore';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';
// import img1 from '../images/img1.png'
// import img2 from '../images/img2.png'
import $ from 'jquery'
import {findDOMNode} from 'react-dom'
const Farm = ({user}) => {
  const {id} = useParams()
  const [farm,setFarm] = useState([])
  const [products,setProducts] = useState([])
  const [categoryProduct,setCategoryProduct] =useState([])
  let list = [];

  const handleMembership=async ()=>{
    await setDoc(doc(db,'farms',id,'members',user?.uid),{
      name:user?.displayName,
    })
    console.log('Joined membership')
  }

  useEffect(()=>{
    console.log('rendering')
    const unsub = onSnapshot(
      collection(db,'farms',id,'products'),
      (snapshot)=>{  
        snapshot.docs.forEach((doc)=>{
          list.push({id: doc.id,...doc.data()})
        });
        setProducts(list)
        setCategoryProduct(list)
      },(error)=>{
        console.log(error)
      }
      
    )
    return ()=>{
      unsub();
    }
  },[])

  const handleToggle=()=>{
    $('.info-banner').slideToggle()
  }


  const handleClick=async(prod)=>{
    const {id, title, price, itemImageUrl,discription} = prod
    console.log("Hellllow");
    await setDoc(doc(db,'users',user?.uid, 'cart', id),{
      item:id,
      title:title,
      price:price,
      itemImageUrl:itemImageUrl,
      discription:discription,
      quantity:1,
      farm:user.uid,
    })
    toast.success(`Item Added to the Cart`)
  }

  const handle1=()=>{
    setCategory('vegetables')
    setCategoryProduct(products.filter(product=>product.category=='Vegetables'))
  }
  const handle2=()=>{
    setCategory('fruits')
    setCategoryProduct(products.filter(product=>product.category=='Fruits'))
  }
  const handle3=()=>{
    setCategory('poultry')
    setCategoryProduct(products.filter(product=>product.category=='Poultry Items'))
  }
  const handle4=()=>{
    setCategory('dairy')
    setCategoryProduct(products.filter(product=>product.category=='Dairy Items'))
  }

  const getFarmDetail=async()=>{
    const details = await getDoc(doc(db,'farms',id))
    setFarm(details.data());
    console.log(farm)
  }

  useEffect(()=>{
    id && getFarmDetail() 
  },[])
  const [category,setCategory] = useState('')
  return (
    <div className='farm-container'>
        {/* <div className='farm-banner-container'>
            <div className='div-1'>
              <h1>Welcome to {farm?.farmName}</h1>
              <p className='description'>{farm?.description}</p>
              <form action="submit" onSubmit={(e)=>{e.preventDefault()}}>
              <input type="text" placeholder={`Quick feedback`} />
              <button type='submit' style={{display:'none'}}></button>
              </form>
              <p style={{margin:'0',marginTop:'10px',marginLeft:'5px'}}><InfoIcon style={{color:'yellow'}}/> Keep it short and to the point</p>
              <p>Would you like to recommend this farm? <ThumbUpIcon style={{marginLeft:'10px',cursor:'pointer'}} className='like'/></p>
            </div>
            <div className='div-2'>
              <img src={farmer} alt="" />
            </div>
        </div> */}
        <div className='farm-banner-main'>
          <div className="div-1">
            <h1>Welcome to {farm?.farmName}</h1>
            <p className='description'>{farm?.description}</p>
            <form action="submit" onSubmit={(e)=>{e.preventDefault()}}>
              <input type="text" placeholder={`Quick feedback`} />
              <button type='submit' style={{display:'none'}}></button>
              </form>
            <p className='like-text'>Would you like to recommend this farm? <ThumbUpIcon style={{marginLeft:'10px',cursor:'pointer'}} className='like'/></p>
          </div>
          <div className="div-2">
            <div className='farm-card'>
              <div className='div-card-1'>
                <img src={farm.bannerURL} alt="" />
              </div>
              <div className='div-card-2'>
                <button className='membership-btn' onClick={handleMembership}><p>Join Membership</p></button>
                  <p style={{textAlign:'center',cursor:'pointer',fontSize:'14px',marginTop:'20px'}} onClick={handleToggle}>Show Membership Benefits</p>
              </div>
            </div>
          </div>
        </div>
        <div className='info-banner' style={{display:'none'}} useRef='toggle'>
          <div className='info-card info-1'>
            <div className='div-1'>
              {/* <img src={img1} alt="" /> */}
            </div>
            <div className="div-2">
              <h3>Early Delivery</h3>
              <p>Being a member of this farm, your orders will the prioritized first making sure you recieve your delivery the earliest</p>
            </div>
          </div>
          <div className='info-card info-1'>
            <div className='div-1'>
              {/* <img src={img2} alt="" /> */}
            </div>
            <div className="div-2">
              <h3>Direct Chat System</h3>
              <p>With the membership you get to directly contact the farmer with our chat web-app</p>
            </div>
          </div>
        </div>
        <hr />
        <div className='farm-content-main'>
          <div className='div-1'>
            <div className='farm-nav'>
              <p>Categories we offer</p>
              <ul>
                <li onClick={handle1} className={`${category==='vegetables' && 'activeCategory'}`} >Vegetables</li>
                <li onClick={handle2} className={`${category==='fruits' && 'activeCategory'}`} >Fruits</li>
                <li onClick={handle3} className={`${category==='poultry' && 'activeCategory'}`} >Poultry Items</li>
                <li onClick={handle4} className={`${category==='dairy' && 'activeCategory'}`}>Dairy Items</li>
              </ul>
              <input type="search" placeholder='Search' />
            </div>
          </div>
          <div className='div-2'>
            <div className="product-container">
            {categoryProduct.map((product)=>{
              return(
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
                    <p onClick={()=>{handleClick(product)}} id={product.id} name={product.farm}>add to cart</p>
                  </div>
                  <p style={{textAlign:'center',marginTop:'10px',fontSize:'10px'}}>produced by {farm?.farmName}</p>
                </div>
                </div>
              </div>
            </div>
              )
            })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Farm
