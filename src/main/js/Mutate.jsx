import React from 'react';

const Bit = ({
  id
}) => {
  let src = "images/blue-bits/"+ id + ".png";
  return (
    <img src={src}
         id={`bit-${id}`}
         className="bit" />
  )
};

class Hello extends React.Component {
 render() {
   return <h1>Hello</h1>
 }
}
