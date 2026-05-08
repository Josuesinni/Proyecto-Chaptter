import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      // onFocus={(e) => {
      //   e.currentTarget.dataset.focused = "false";
      //   props.onFocus?.(e);
      // }}
      onBlur={(e) => {
        e.currentTarget.dataset.focused = "true";
        props.onBlur?.(e);
      }}
      data-focused="false"
      className={clsx(
        "peer border border-slate-300 bg-white rounded-md w-full h-10 focus:outline-0 focus:border-blue-300 shadow focus:shadow-blue-300 ps-2 pe-2 data-[focused='true']:invalid:border-red-500 data-[focused='true']:invalid:shadow-red-500",
        className,
      )}
    />
  );
};
/**
 *
 */
export default Input;
