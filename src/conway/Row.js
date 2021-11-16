import propTypes from 'prop-types';

import './Row.css';

export const Row = ({ children }) => <div className="row">{children}</div>;

Row.propTypes = {
  children: propTypes.node.isRequired,
};
