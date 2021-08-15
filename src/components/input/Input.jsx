const Input = ({
  type,
  className,
  placeholder,
  onChange,
  onKeyPress,
  value
}) => {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
    />
  );
};

export default Input;
