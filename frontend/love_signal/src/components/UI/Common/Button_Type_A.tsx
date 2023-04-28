import style from "./Button_Type_A.module.scss";

type propsType = {
  className?: string;
  width?: string;
  height?: string;
  background?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: any;
};

const Button_Type_A: React.FC<propsType> = ({
  className = "",
  width,
  height,
  background,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={`${style.button} ${style[className]}`}
      style={{
        width: `${width}`,
        height: `${height}`,
        background: `${background}`,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button_Type_A;
