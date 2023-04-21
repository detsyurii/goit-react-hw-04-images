import PropTypes from 'prop-types';

export const Button = ({ children, onClick }) => {
  return (
    <>
      <button type="button" className="Button" onClick={onClick}>
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
