import React from 'react';

const Badge = ({ color = 'primary', children }) => {
  return (
    <span className={`badge badge-${color} badge-pill`}>{children}</span>
  );
};

export default Badge;
