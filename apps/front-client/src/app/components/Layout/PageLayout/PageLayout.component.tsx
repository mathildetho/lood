import React from 'react';
import SnackBarsWrapperComponent from '../../Feedback/SnackBar/SnackBarsWrapper.component';
import Menu from '../../Navigation/Menu/Menu/Menu.component';
import MenuBasic from '../../Navigation/Menu/MenuBasic/MenuBasic.component';
import './PageLayout.css';

const PageLayout = (props: {
  className?: string;
  classNameAuth?: string;
  children: React.ReactNode;
  auth?: boolean;
}) => {
  return (
    <div className="page-layout">
      {props.auth ? <MenuBasic /> : <Menu />}
      <div className={`page-content--center ${props.className}`}>
        {props.children}
        <SnackBarsWrapperComponent />
      </div>
    </div>
  );
};

export default PageLayout;
