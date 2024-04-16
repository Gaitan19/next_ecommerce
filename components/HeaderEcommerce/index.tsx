'use client';

import {
  CCollapse,
  CContainer,
  CNavItem,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
} from '@coreui/react';
import { useContext, useState } from 'react';
import LogOut from '../LogOut';
import Image from 'next/image';
import ecommerce_logo from '@/assets/images/ecommerce_logo.png';
import { navbarOptions } from '@/data/routes';
import { FaShoppingBag } from 'react-icons/fa';
import { ecommerceContext } from '@/context/EcommerceContext';
import { Badge } from '@mui/material';

const HeaderNotes = ({ value }: any) => {
  const [visible, setVisible] = useState(false);
  const { productsCart, setVisibleCart } = useContext(ecommerceContext);

  const renderOptions = () =>
    navbarOptions.map((option, index) => (
      <CNavItem key={index} className="me-auto mb-2 mb-lg-0">
        <CNavLink href={option.path}>{option.name}</CNavLink>
      </CNavItem>
    ));

  return (
    <header className="w-full">
      <CNavbar expand="lg" className="bg-body-tertiary">
        <CContainer fluid>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarBrand href="/Home">
              <Image
                width={70}
                height={60}
                src={ecommerce_logo}
                alt="ecommerce logo"
              />
            </CNavbarBrand>
            <CNavbarNav className="me-auto mb-2 mb-lg-0">
              {renderOptions()}
            </CNavbarNav>

            <div className="flex gap-5">
              <button className="" onClick={() => setVisibleCart(true)}>
                <Badge badgeContent={productsCart.length} color="success">
                  <FaShoppingBag />
                </Badge>
              </button>
              <LogOut value={value} />
            </div>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </header>
  );
};

export default HeaderNotes;
