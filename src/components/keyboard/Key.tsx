import { ReactNode } from "react";
import classnames from "classnames";
import { KeyValue } from "../../lib/keyboard";
import { CharStatus } from "../../lib/statuses";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  width?: number;
  status?: CharStatus;
  onClick: (value: KeyValue) => void;
};

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    "h-12 sm:h-14 flex items-center justify-center rounded mx-0.5 text-sm font-bold cursor-pointer text-gray-900",
    {
      "bg-slate-300 dark:bg-slate-200 hover:bg-slate-400 active:bg-slate-500": !status,
      "bg-slate-500 text-slate-200 dark:text-slate-300 dark:bg-slate-600": status === "absent",
      "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white": status === "correct",
      "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white": status === "present",
      "bg-sky-700 dark:bg-sky-700 hover:!bg-sky-600 active:!bg-sky-800 !text-gray-100 !text-xs": value === "ENTER",
      "bg-fuchsia-800 dark:bg-fuchsia-800 hover:!bg-fuchsia-600 active:!bg-fuchsia-900 !text-gray-100 !text-xs": value === "DELETE",
    }
  );

  return (
    <div
      style={{ width: `${width}px` }}
      className={classes}
      onClick={() => onClick(value)}
    >
      {children || value}
    </div>
  );
};
