import React from 'react';
import Icon, { IconProps } from '../../DataDisplay/Icon/Icon.component';
import './Button.css';

interface ButtonProps extends IconProps {
  className: string;
  classNameText: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
  leftIcon?: string;
}

const Button = (props: ButtonProps) => {
  const {
    className,
    text,
    onClick,
    submit,
    classNameText,
    leftIcon,
    classNameSVG,
  } = props;
  const type = submit ? 'submit' : 'button';
  return (
    <button className={`button ${className}`} type={type} onClick={onClick}>
      <div className="button__body">
        {leftIcon && (
          <Icon
            className="button__icon button__icon--left"
            path={leftIcon}
            classNameSVG={classNameSVG}
          />
        )}
        <p className={`--button-text ${classNameText}`}>{text}</p>
      </div>
    </button>
  );
};

export default Button;
