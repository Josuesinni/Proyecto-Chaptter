import { type SubmitEvent } from "react";
import Input from "../../../components/Input";
import { useAuth } from "../../../auth/useAuth";

const LoginAccount = () => {
  const { login } = useAuth();
  async function iniciarSesion(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as {
      email: string;
      password: string;
    };
    login(data.email, data.password);
  }
  return (
    <div className="flex flex-col p-4 sm:p-8 space-y-4 items-center bg-white rounded-xl shadow sm:min-h-60 sm:w-140 justify-center ms-4 me-4">
      <form id="form-login" className="w-full" onSubmit={iniciarSesion}>
        <div>
          <label htmlFor="correo" className="text-gray-800">
            Correo Electrónico:
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            required
          />
          <p className="invisible peer-data-[focused='true']:peer-invalid:visible text-pink-600 text-sm">
            Por favor, ingrese un correo electrónico válido
          </p>
        </div>
        <div>
          <label htmlFor="password" className="text-gray-800">
            Contraseña:
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Ingrese la contraseña"
            required
          />
          <span className="invisible peer-data-[focused='true']:peer-invalid:visible block text-pink-600 text-sm">
            Por favor, ingrese una contraseña válida
          </span>
        </div>
      </form>
      <button
        type="submit"
        form="form-login"
        className="p-2 ps-4 pe-4 bg-logo-azul hover:bg-logo-azul-oscuro cursor-pointer rounded-xl transition-colors ease-in-out font-bold text-white w-full"
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default LoginAccount;
