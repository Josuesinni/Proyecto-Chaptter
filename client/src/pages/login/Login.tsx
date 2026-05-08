import { useState } from "react";
import LoginAccount from "./forms/LoginAccount";
import CreateAccount from "./forms/CreateAccount";

const Login = () => {
  const [accion, setAccion] = useState(false);
  return (
    <div className="flex-1 flex-col min-h-0 flex items-center justify-center w-full h-full space-y-4">
      <div className="inline-flex items-center">
        <img src="logo.svg" alt="" width={30} height={30} />
        <p className="font-semibold text-lg">MicroSaaS</p>
      </div>
      <p className="text-[17px] text-logo-morado-oscuro">
        <b>{!accion?"Ingresa a":"Registra"} tu cuenta</b>
      </p>
      {!accion && <LoginAccount />}
      {accion && <CreateAccount />}
      <div className="flex flex-col p-4 sm:p-8 space-y-4 items-center bg-white rounded-xl shadow sm:h-30 sm:w-140 justify-center">
        <p className="text-logo-azul font-semibold">
          {!accion?"¿Aún no tienes una cuenta?":"¿Ya tienes una cuenta?"}
        </p>
        <button
          type="submit"
          className="p-2 ps-4 pe-4 text-logo-azul cursor-pointer rounded-xl font-bold bg-white shadow border-slate-200 w-full transition-colors ease-in-out hover:text-logo-azul-oscuro hover:bg-gray-50"
          onClick={()=>setAccion(!accion)}
        >
          {!accion?"Registrate":"Inicia Sesión"}
        </button>
      </div>
    </div>
  );
};
// surtidor 5 pegamento
export default Login;
