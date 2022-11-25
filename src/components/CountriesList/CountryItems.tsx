import React from 'react';

interface Props {
  name: string;
  onClick: React.MouseEventHandler;
}

const CountryItems: React.FC<Props> = (props) => {
  return (
    <li className="list-group-item list-group-item-action" onClick={props.onClick}>
      {props.name}
    </li>
  );
};

export default CountryItems;