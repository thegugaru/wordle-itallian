import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cell } from "../grid/Cell";
import { XIcon } from "@heroicons/react/outline";

type Props = {
  isOpen: boolean;
  dictionarySize: number;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, dictionarySize, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
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
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-medium"
                  >
                    Come giocare
                  </Dialog.Title>
                  <div className="mt-4 text-gray-500 dark:text-gray-400">
                    <p className="text-sm dark:text-gray-100">
                      Indovina la <b>paroletta</b> in sei tentativi. Per ogni tentativo riceverai indizi dal colore delle caselle.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="F" status="correct" />
                      <Cell value="R" />
                      <Cell value="A" />
                      <Cell value="T" />
                      <Cell value="E" />
                    </div>
                    <p className="text-sm">
                      La lettera <b>F</b> è contenuta nella parola ed è nella posizione corretta
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="L" />
                      <Cell value="I" />
                      <Cell value="S" status="present" />
                      <Cell value="T" />
                      <Cell value="A" />
                    </div>
                    <p className="text-sm">
                      La lettera <b>S</b> è contenuta nella parola ma è nella posizione sbagliata
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="S" />
                      <Cell value="U" />
                      <Cell value="O" />
                      <Cell value="L" status="absent" />
                      <Cell value="A" />
                    </div>
                    <p className="text-sm ">
                      La lettera <b>L</b> non è contenuta nella parola
                    </p>

                    <p className="text-sm mt-5 dark:text-gray-100">
                      N.B.: nell'adattamento in italiano il dizionario è volutamente limitato, e contiene sostantivi al singolare e verbi all'infinito.
                      <br />Ora è composto da {dictionarySize} elementi.
                    </p>
                    <p className="text-sm">
                    • <br/>
                      La <b>paroletta</b> segreta è la stessa per un intero giorno, poi da mezzanotte ce n'è una nuova.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
