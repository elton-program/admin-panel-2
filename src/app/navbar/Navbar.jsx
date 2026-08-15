import React from 'react'
import './navbar.css'
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className='navbar'>
      <h1>{pathname == "/products"? ("Product"): pathname=="/dashboard"? ("Dashboard"):("Categories")}</h1>
    </div>
  )
}

export default Navbar