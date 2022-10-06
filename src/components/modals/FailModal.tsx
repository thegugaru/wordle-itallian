import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MiniGrid } from "../mini-grid/MiniGrid";
import { NextCountdown } from "../elements/NextCuntdown";
import { ShareButton } from "../elements/ShareButton";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  solution: string;
  todayTS: number;
  title: string;
};

export const FailModal = ({ isOpen, handleClose, guesses, solution, todayTS, title }: Props) => {
  const onCountdownEnd = () => {
      window.location.reload();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed top-0 z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <button className="focus:outline-dashed outline-1 outline-blue-500 absolute right-2 top-2 cursor-pointer"
                onClick={handleClose}>
                <XIcon className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </button>
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-fuchsia-700">
                  <XIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <MiniGrid guesses={guesses} />
                    {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">La paroletta giusta è <b className="text-red-600 dark:text-red-500">{solution}</b></p> */}
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-6 px-1">
                <NextCountdown todayTS={todayTS} onEnd={onCountdownEnd} />
              </div>

              <div className="mt-4 sm:mt-6">
                <ShareButton guesses={guesses} title={title} success={false} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
