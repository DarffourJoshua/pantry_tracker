
import clsx from "clsx";

export function Button({ children, className, ...rest }) {
    return (
      <button
        {...rest}
        className={clsx(
          `flex h-10 items-center rounded-lg bg-orange-500 
          px-4 text-sm font-bold transition-colors 
          hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 
          focus-visible:outline-offset-2 focus-visible:outline-orange-500 
          active:bg-orange-100 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
          className,
        )}
      >
        {children}
      </button>
    );
  }