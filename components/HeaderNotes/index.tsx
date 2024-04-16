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
import { useState } from 'react';
import LogOut from '../LogOut';

const HeaderNotes = ({ value }: any) => {
  const [visible, setVisible] = useState(false);

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
            <CNavbarBrand href="#">Hidden brand</CNavbarBrand>
            <CNavbarNav className="me-auto mb-2 mb-lg-0">
              <CNavItem>
                <CNavLink href="#" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Link</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" disabled>
                  Disabled
                </CNavLink>
              </CNavItem>
            </CNavbarNav>
            <LogOut value={value} />
          </CCollapse>
        </CContainer>
      </CNavbar>
    </header>
  );
};

export default HeaderNotes;
