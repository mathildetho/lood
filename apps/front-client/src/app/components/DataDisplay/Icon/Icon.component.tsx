import React from 'react';
import { ReactSVG } from 'react-svg';
import './Icon.css';

export interface IconProps {
  path?: string;
  className?: string;
  classNameSVG?: string;
  onClick?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
}

const Icon = (props: IconProps) => {
  const { path, className, onClick, classNameSVG } = props;
  return (
    <div className={`icon ${className}`} onClick={onClick}>
      <ReactSVG src={path} className={`icon__svg ${classNameSVG}`} />
    </div>
  );
};

export default Icon;
