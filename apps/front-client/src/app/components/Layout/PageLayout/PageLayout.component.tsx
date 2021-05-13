import React from 'react';
import SnackBar from '../../Feedback/SnackBar/SnackBar.component';
import SnackBarsWrapperComponent from '../../Feedback/SnackBar/SnackBarsWrapper.component';
import MenuBasic from '../../Navigation/Menu/MenuBasic/MenuBasic.component';
import './PageLayout.css';

const PageLayout = (props: {
  className?: string;
  classNameAuth?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="page-layout">
      <MenuBasic />
      <div className={`page-content--center ${props.className}`}>
        {props.children}
        <SnackBarsWrapperComponent />
      </div>
    </div>
  );
};

export default PageLayout;
