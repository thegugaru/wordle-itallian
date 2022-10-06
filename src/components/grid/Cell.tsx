import { CharStatus } from '../../lib/statuses';
import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { trigger } from '../../lib/eventbus';

type Props = {
  value?: string;
  status?: CharStatus;
  index?: number;
};

export const Cell = ({ value, status, index = 0 }: Props) => {
  const [currentStatus, setCurrentStatus] = useState('');
  const el:any = useRef(null);

  useEffect(() => {
    if (status && value) {
      setTimeout(() => {
        el.current.dataset.animation = 'flip-in';
      }, index * 300 );

      el.current.addEventListener('animationend', (a: AnimationEvent) => {
        if ('FlipIn' === a.animationName) {
          el.current.dataset.animation = 'flip-out';
          if (value) {
            setCurrentStatus(status);
          }
        };

        if ('FlipOut' === a.animationName) {
          el.current.dataset.animation = '';
          if (index === 4) {
            trigger("revealEnd");
          }
        }
      });

    }
  }, [index, status, value]);

  const classes = classnames(
    "cell sm:w-14 sm:h-14 w-12 h-12 flex items-center justify-center mx-0.5 text-4xl font-extrabold rounded",
    {
      "text-slate-200 bg-slate-800 dark:text-slate-800 dark:bg-slate-100": !currentStatus,
      "text-slate-200 bg-slate-500 dark:text-slate-300 dark:bg-slate-600": currentStatus === "absent",
      "text-white bg-green-500": currentStatus === "correct",
      "text-white bg-yellow-500": currentStatus === "present",
    }
  );

  return (
    <>
      <div ref={el} className={classes}>{value}</div>
    </>
  );
};
