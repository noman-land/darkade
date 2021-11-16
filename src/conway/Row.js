import PropTypes from 'prop-types';
import React from 'react';

export const Row = ({ children }) => <div className="row">{children}</div>;

Row.propTypes = {
  children: PropTypes.node.isRequired,
};
