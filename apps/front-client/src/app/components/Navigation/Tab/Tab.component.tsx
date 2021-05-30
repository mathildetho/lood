import React from 'react';
import Icon from '../../DataDisplay/Icon/Icon.component';
import './Tab.css';

const Tab = (props: {
  active: boolean;
  className: string;
  img: string;
  name: string;
}) => {
  return (
    <div className={(props.active ? 'tab active' : 'tab ') + props.className}>
      <Icon path={props.img} className="tab__icon" />
      <p className="tab__name">{props.name}</p>
    </div>
  );
};

export default Tab;
