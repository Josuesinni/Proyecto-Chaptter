import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface NavbarItemTs {
  titulo: string;
  icono?: string;
  ruta: string;
}
const NavbarItemsList: NavbarItemTs[] = [
  {
    titulo: "Inicio",
    icono: "M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z",
    ruta: "/",
  },
  {
    titulo: "Planes",
    ruta: "/planes",
  },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="flex justify-between sticky top-0 min-w-full h-18 shadow-md items-center pe-4 ps-4 bg-white">
      <NavLink
        to={"/"}
        className="inline-flex items-center font-semibold text-xl hover:text-logo-azul-oscuro transition-[color] duration-150 ease-in-out cursor-pointer"
      >
        <img src="logo.svg" alt="" className="w-8 h-8" />
        <span className="sm:inline hidden">MicroSaaS</span>
      </NavLink>
      <div className="flex items-center justify-end sm:justify-between gap-x-6">
        {" "}
        {/* md:min-w-sm lg:min-w-md xl:min-w-xl */}
        <div className="sm:inline hidden">
          {NavbarItemsList.map((item, idx) => {
            return <NavbarItem {...item} key={idx} />;
          })}
        </div>
        <div className="inline-flex items-center gap-x-4">
          {user?.usuario && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-8 h-8 fill-logo-morado"
            >
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
          )}
          <p>{user?.usuario}</p>
          {user?.is_premium == 0 && (
            <span className="p-0.5 ps-3 pe-3 bg-slate-200 rounded-2xl font-semibold">
              Gratuito
            </span>
          )}
          {user?.is_premium == 1 && (
            <span className="p-0.5 ps-3 pe-3 bg-black text-white rounded-2xl font-semibold">
              Premium
            </span>
          )}
          {!user && (
            <NavLink
              to={"/login"}
              className={clsx(
                "bg-logo-morado rounded-md p-1.5 ps-3 pe-3 text-white font-bold",
                "transition-[background-color] duration-150 ease-in-out",
                "hover:bg-logo-morado-oscuro",
              )}
            >
              Iniciar Sesión
            </NavLink>
          )}
          {user && (
            <button
              onClick={logout}
              className={clsx(
                "bg-gray-800 rounded-md p-1.5 ps-3 pe-3 text-white font-bold",
                "transition-[background-color] duration-150 ease-in-out",
                "hover:bg-black",
              )}
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavbarItem = ({ titulo, icono, ruta }: NavbarItemTs) => {
  return (
    <NavLink
      to={ruta}
      className={({ isActive }) =>
        clsx(
          isActive && "text-logo-azul",
          "inline-flex items-center font-semibold",
          "transition-[color] duration-150 ease-in-out",
          "hover:text-logo-azul-oscuro",
        )
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="fill-current"
      >
        <path d={icono} />
      </svg>
      {titulo}
    </NavLink>
  );
};

export default Navbar;
