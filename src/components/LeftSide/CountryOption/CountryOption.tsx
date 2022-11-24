import React from 'react';

interface Props {
  name: string;
}

const CountryOption: React.FC<Props> = (props) => {
  return (
    <option>
      {props.name}
    </option>
  );
};

export default CountryOption;