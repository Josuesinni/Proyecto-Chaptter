import Input from "../../components/Input";

const PanelActividades = () => {
  return (
    <div className="p-8">
      <h2 className=""></h2>
      <form>
        <label htmlFor="">Registrar actividad</label>
        <div className="flex gap-x-3 max-w-sm">
          <Input />{" "}
          <button className="bg-logo-azul hover:bg-logo-azul-oscuro p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
            </svg>
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default PanelActividades;
