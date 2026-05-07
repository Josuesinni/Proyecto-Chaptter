import clsx from "clsx";
import type { CardSubscriptionTs } from "../types";
import CardItemList from "./CardItemList";

const CardSubscription = ({
  tipo,
  modo,
  precio,
  textoBoton,
  beneficios,
}: CardSubscriptionTs) => {
  return (
    <div
      className={clsx(
        "rounded-xl shadow min-h-100 min-w-60 w-full max-w-sm place-self-center p-6",
        tipo == 0 && "bg-white outline-slate-300 outline",
        tipo == 1 && "bg-logo-morado text-white",
        "space-y-2"
      )}
    >
      <p className="text-2xl font-semibold">{modo}</p>
      <p className="text-3xl font-bold text-center">${precio}</p>
      <button
        className={clsx(
          "rounded-2xl p-2 ps-4 pe-4 font-bold cursor-pointer",
          "transition-[background-color] duration-150 ease-in-out",
          tipo === 0 && "bg-slate-100 hover:bg-slate-200",
          tipo === 1 && "bg-logo-azul hover:bg-logo-azul-oscuro",
          
        )}
        type="button"
      >
        {textoBoton}
      </button>
      {beneficios.map((beneficio, idx) => {
        return <CardItemList {...beneficio} key={idx} />;
      })}
    </div>
  );
};
export default CardSubscription;
