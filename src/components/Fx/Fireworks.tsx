import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import './Fireworks.css';

type Props = {
  isOpen: boolean;
};

export const Fireworks = ({ isOpen }: Props) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
    >
      <div className="absolute left-0 right-0 top-0 bottom-0 w-full h-full overflow-hidden">
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </div>
    </Transition>
  );
};
