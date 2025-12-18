/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
