import clsx from "clsx";
import type { CardSubscriptionTs } from "../types";
import CardItemList from "./CardItemList";
import { api } from "../../../api";
import { useAuth } from "../../../auth/useAuth";
import { useNavigate } from "react-router-dom";

const CardSubscription = ({
  tipo,
  modo,
  precio,
  textoBoton,
  beneficios,
}: CardSubscriptionTs) => {
  const {user}=useAuth()
  const navigate = useNavigate()
  const pagarSuscripcion = async () => {
    if(!user) return navigate("/login");
    const res = await api.post("/stripe/pago_suscripcion",{email:user.email});
    console.log(res.data)
    console.log(res.data.session._data.url);
    window.location.href = res.data.session._data.url;
  };
  const empezar = async () => {
    navigate("/login");
  };
  return (
    <div
      className={clsx(
        "rounded-xl shadow min-h-100 min-w-60 w-full max-w-sm place-self-center p-6",
        tipo == 0 && "bg-white outline-slate-300 outline",
        tipo == 1 && "bg-logo-morado text-white",
        "space-y-2",
      )}
    >
      <p className="text-2xl font-semibold">{modo}</p>
      <p className="text-3xl font-bold text-center">${precio}</p>
      <button
        onClick={() => {
          if(tipo==0) return empezar();
          if (tipo == 1 || user?.is_premium==0 ) pagarSuscripcion();
        }}
        disabled={user?.is_premium==1}
        className={clsx(
          "rounded-2xl p-2 ps-4 pe-4 font-bold cursor-pointer",
          "transition-[background-color] duration-150 ease-in-out",
          tipo === 0 && "bg-slate-100 not-disabledhover:bg-slate-200",
          tipo === 1 && "bg-logo-azul not-disabled:hover:bg-logo-azul-oscuro",
          "disabled:opacity-75 disabled:cursor-not-allowed"
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
