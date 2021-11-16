import classNames from 'classnames';
import propTypes from 'prop-types';
import React from 'react';

export const Cell = ({ alive }) => (
  <span className={classNames('cell', { on: alive })} />
);

Cell.propTypes = {
  alive: propTypes.bool.isRequired,
};
