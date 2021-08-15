import "./button.css";
const Button = ({ className, type, onClick, text }) => {
  return (
    <div>
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
