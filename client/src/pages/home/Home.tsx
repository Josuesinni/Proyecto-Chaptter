import React from "react";

const Home = () => {
  return (
    <div className="h-full w-full p-4 text-center">
      <div className="text-3xl font-semibold inline-flex items-center gap-x-2">
        <span>¡Te damos la bienvenida a</span>
        <div className="inline-flex items-center">
          <img src="logo.svg" alt="" className="w-8 h-8" /> MicroSaaS!
        </div>
      </div>
      <div>
        <p>Aquí podrás gestionar tus tareas del día</p>
      </div>
      <div className="text-left p-8 ">
        <b className="text-lg">Pasos de uso:</b>
        <ul>
          <li>
            1. El primer paso es registrar una nueva cuenta si no cuentas con
            una. <br />
            <i className="font-thin">
              Nota: Si ya cuentas con una cuenta puedes iniciar sesión
              directamente
            </i>
          </li>
          <li>
            2. Para actualizar tu plan puedes hacerlo desde la página de planes,
            puedes optar por seguir en el plan gratuito o suscribirte a la
            membresia premium
          </li>
          <li>
            3. Al inciar sesión podrás acceder al panel de actividades en donde
            podrás registrar y darle seguimiento a las actividades que registres
            <br />
            <i className="font-thin">
              Nota: Algunas funciones podrían estar bloqueadas según el tipo de plan escogido
            </i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
