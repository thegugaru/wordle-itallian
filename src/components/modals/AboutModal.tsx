import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

type Props = {
  isOpen: boolean;
  isDev: boolean;
  handleClose: () => void;
};

export const AboutModal = ({ isOpen, isDev, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
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
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
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
                    Informazioni
                  </Dialog.Title>

                  {isDev && <div className="bg-fuchsia-800 p-2 rounded text-white my-8">
                      Attenzione: questo è un indirizzo di test.
                      L'indirizzo giusto è<br/>
                      <a href="https://parolette.netlify.app" className="font-bold">parolette.netlify.app</a>
                    </div>}

                  <div className="mt-4 text-left text-sm">
                    <p>
                      <b>Parolette</b> è un progetto open source, il codice sorgente è disponibile{" "}
                      <a
                        href="https://github.com/xho/wordle"
                        className="underline focus:outline-dotted font-bold"
                        target="_blank"
                        rel="noreferrer"
                      >
                        su github
                      </a>.{" "}
                      <br className="sm:hidden" />
                      Per il popolo da {" "}
                      <a
                        href="https://twitter.com/xho"
                        className="underline focus:outline-none font-bold"
                        target="_blank"
                        rel="noreferrer"
                      >@xho</a>.
                    </p>
                  </div>

                  <div className="mt-8 mb-1 text-left text-xs md:text-sm">
                    <p className="font-extrabold">Fastidiose domandine ricorrenti</p>

                    <ul className="mt-3 list-decimal list-inside">
                      <li>
                        <span className="font-bold">Perché solo sostantivi al singolare e verbi all'infinito? Non mi piace.</span>
                        <p className="mt-1">È stata una scelta motivata da alcune considerazioni di carattere linguistico e sulla complessità del gioco, e che non potrei riassumere in queste poche righe. Se non sei d'accordo, vedi il punto 3.</p>
                      </li>
                      <li className="mt-3">
                        <span className="font-bold">Va bene, ma mancano delle parole nel dizionario.</span>
                        <p className="mt-1">Puoi creare una PR o aprire una issue su Github al link sopra riportato. Altrimenti puoi segnalarmelo <a
                        href="https://twitter.com/xho"
                        className="underline focus:outline-none font-bold"
                        target="_blank"
                        rel="noreferrer"
                      >su Twitter</a>.</p>
                      </li>
                      <li className="mt-3">
                        <span className="font-bold">Non ci sono le statistiche e mancano altre cose, è fatto male…</span>
                        <p className="mt-1">Per il valore-lavoro immateriale necessario alla creazione e pubblicazione di questo simpatico giochino non mi viene corrisposto un salario, solo un po' di gioia che deriva dal condividere, mentre per te è tutto gratuito. Quindi questo è, ma puoi fare qualcosa come è spiegato al punto 4.</p>
                      </li>
                      <li className="mt-3">
                        <span className="font-bold">Si può fare meglio.</span>
                        <p className="mt-1">Non vi è dubbio. Il codice sorgente è aperto e puoi clonare il progetto e farne uno secondo i tuoi gusti. Se non sai farlo, vedi il punto 5.</p>
                      </li>
                      <li className="mt-3">
                        <span className="font-bold">Non sono capace a farlo da solo!</span>
                        <p className="mt-1">Mi spiace. Puoi forse ricorrere a qualche amico, oppure cercare aiuto in rete. Se non puoi farlo, vai al punto 6.</p>
                      </li>
                      <li className="mt-3">
                        <span className="font-bold">Questo non mi piace, nessuno può farlo come lo desidero…</span>
                        <p className="mt-1">Attaccati al cazzo. 🖖</p>
                      </li>
                    </ul>
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
