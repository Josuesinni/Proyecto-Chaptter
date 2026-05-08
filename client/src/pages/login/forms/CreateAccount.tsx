import type { SubmitEvent } from "react";
import Input from "../../../components/Input";
import { useAuth } from "../../../auth/useAuth";

const CreateAccount = () => {
  const { createUser } = useAuth();

  async function crearCuenta(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as {
      email: string;
      user: string;
      password: string;
    };
    createUser(data.user, data.email, data.password);
  }
  return (
    <div className="flex flex-col p-4 sm:p-8 space-y-4 items-center bg-white rounded-xl shadow sm:min-h-60 sm:w-140 justify-center ms-4 me-4">
      <form id="form-login" className="space-y-4" onSubmit={crearCuenta}>
        <label htmlFor="correo" className="peer-invalid:text-red">
          Nombre de Usuario:
        </label>
        <Input
          id="user"
          name="user"
          type="text"
          placeholder="Ingrese el nombre de usuario"
          required
        />
        <span className="peer-data-[focused='true']:invalid:text-red peer-data-[focused='true']:invalid:inline hidden">
          Error
        </span>

        <label htmlFor="email" className="peer-invalid:text-red">
          Correo Electrónico:
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="ejemplo@correo.com"
          required
        />
        <span className="peer-data-[focused='true']:invalid:text-red peer-data-[focused='true']:invalid:inline hidden">
          Error
        </span>
        <label htmlFor="password">Contraseña:</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Ingrese la contraseña"
          required
        />
      </form>
      <button
        type="submit"
        form="form-login"
        className="p-2 ps-4 pe-4 bg-logo-azul hover:bg-logo-azul-oscuro cursor-pointer rounded-xl transition-colors ease-in-out font-bold text-white w-full"
      >
        Crear Cuenta
      </button>
    </div>
  );
};

export default CreateAccount;
