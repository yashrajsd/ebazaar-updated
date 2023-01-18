import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import Logo from '.././images/EBazaar.png'
const Navbar = ({user,active,setActive}) => {
  return (
    <div className='navbar-main'>
        <div className='navbar-container'>
        <div className='navbar-logo'>
            <Link to={'/'} style={{textDecoration:'none'}} onClick={()=>{setActive('home')}}>
            <img src={Logo} alt="" />
            </Link>   
        </div>
        <div className='links-list'>
            <ul><Link to={'/'} style={{textDecoration:'none'}} onClick={()=>{setActive('home')}}>
            <li><p className={`${active==='home' ? 'active' : ''}`}>Home</p></li>
            </Link>
            <Link to={'/farms'} style={{textDecoration:'none'}} onClick={()=>{setActive('farms')}}>
            <li><p className={`${active==='farms' ? 'active' : ''}`}>Farms</p></li>
            </Link>
            <Link to={'/helpers'} style={{textDecoration:'none'}} onClick={()=>{setActive('helpers')}}>
            <li><p className={`${active==='helpers' ? 'active' : ''}`}>Hire Helpers</p></li>
            </Link>
            <Link to={'/cbs'} style={{textDecoration:'none'}} onClick={()=>{setActive('cbs')}}>
            <li><div className='cbs'><p className={`${active==='cbs' ? 'active' : ''}`}>CBS</p><span className='cbs-featured'>Featured</span></div></li>
            </Link>  
                {user && (<li><p>Create Farm</p></li>)}
            </ul>
            <div className='auth-button'>
                <Link to={'/auth'} onClick={()=>{setActive('auth')}}>
                <button className={`${active === 'auth' ? 'active-btn':''}`}>Sign Up</button>
                </Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar