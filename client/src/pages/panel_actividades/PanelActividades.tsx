import Input from "../../components/Input";

const PanelActividades = () => {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-semibold">Panel de Actividades</h2>
      <form>
        <p>Registrar Actividad</p>
        <div className="flex gap-x-3">
          <div className="">
            <label htmlFor="">Fecha:</label>
            <Input
              type="date"
              defaultValue={new Date().toISOString().substring(0, 10)}
            />{" "}
          </div>
          <div>
            <label htmlFor="">Actividad:</label>
            <Input />{" "}
          </div>
          <div className="flex items-end">
            <button className="font-bold text-white bg-logo-azul hover:bg-logo-azul-oscuro p-2 rounded-md inline-flex items-center transition-[background-color] duration-150 ease-in-out cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-6 h-6 fill-current"
              >
                <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
              </svg>
              Agregar
            </button>
          </div>
        </div>
      </form>
      <div>
        <p>Lista de Actividades</p>
        
      </div>
    </div>
  );
};

export default PanelActividades;
