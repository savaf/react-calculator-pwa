import React from "react";
import PropTypes from "prop-types";

export function Button(props) {
  return (
    <button
      className={`Button ${props.className}`}
      onClick={props.onClick.bind(null, props.value)}
    >
      {props.value}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
