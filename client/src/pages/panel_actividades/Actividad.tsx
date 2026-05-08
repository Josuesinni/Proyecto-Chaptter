import clsx from "clsx";
import type { IActividad } from "./types";

const Actividad = ({
  task,
  onEdit,
  onDelete,
  onUpdateEstatus,
  isPremium,
}: IActividad) => {
  const { actividad, fecha, estatus } = task;
  return (
    <div className="grid grid-cols-5 items-center">
      <div>
        <p>{fecha}</p>
      </div>
      <div className="font-semibold">{actividad}</div>
      <div>
        <p
          onClick={() => onUpdateEstatus(task)}
          className={clsx(
            "ps-4 pe-4 p-1 rounded-lg font-bold w-fit",
            "cursor-pointer transition-colors ease-in-out",
            estatus
              ? "bg-emerald-300 text-emerald-700 hover:bg-emerald-400 hover:text-emerald-900"
              : "bg-sky-200 text-sky-600  hover:bg-sky-400 hover:text-sky-900",
          )}
        >
          {!estatus ? "En progreso" : "Terminada"}
        </p>
      </div>
      <button
        onClick={() => onEdit(task)}
        className={clsx(
          "inline-flex items-center text-white bg-blue-400 rounded-md p-2 w-fit cursor-pointer",
          isPremium && "hover:bg-blue-600 transition-colors",
          !isPremium && "cursor-not-allowed! opacity-80",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="fill-current w-6 h-6"
        >
          <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />
        </svg>
        Editar
      </button>
      <button
        onClick={() => {
          onDelete(task);
        }}
        className={clsx(
          "inline-flex items-center text-white bg-red-400 rounded-md p-2 w-fit cursor-pointer",
          isPremium && "hover:bg-red-600 transition-colors",
          !isPremium && "cursor-not-allowed! opacity-80",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="fill-current w-6 h-6"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
        </svg>
        Eliminar
      </button>
    </div>
  );
};

export default Actividad;
