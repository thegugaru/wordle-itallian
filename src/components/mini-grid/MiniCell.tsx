import { CharStatus } from "../../lib/statuses";
import classnames from "classnames";

type Props = {
  status: CharStatus;
};

export const MiniCell = ({ status }: Props) => {
  const classes = classnames(
    "w-10 h-10 flex items-center justify-center m-1 text-lg font-bold rounded",
    {
      "bg-slate-300 dark:bg-white": status === "absent",
      "bg-green-500": status === "correct",
      "bg-yellow-500": status === "present",
    }
  );

  return (
    <>
      <div className={classes}></div>
    </>
  );
};
