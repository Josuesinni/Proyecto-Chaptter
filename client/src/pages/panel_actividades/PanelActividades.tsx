import { useEffect, useState, type SubmitEvent } from "react";
import Input from "../../components/Input";
import {
  createTask,
  deleteTask,
  getTasks,
  updateStateTask,
  updateTask,
} from "./consultaApi";
import { useAuth } from "../../auth/useAuth";
import type { Task } from "./types";
import Actividad from "./Actividad";
import Dialog from "../../components/Dialog";
import clsx from "clsx";
import { api } from "../../api";

const PanelActividades = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Partial<Task>>({ actividad: "" });
  const [taskDelete, setTaskDelete] = useState<Partial<Task>>({
    actividad: "",
  });

  const [showDialogFuncionPremium, setShowDialogFuncionPremium] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (!user) return;
    getTasks(setTasks, user.email);
  }, [user]);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as Task;
    if (user)
      if (!task?.id) {
        const res = await createTask(data, setTasks, user.email);
        if (res) setTask({ actividad: "" });
      } else updateTask(data, user.email, setTasks);
  };
  const mejorarPlan = async () => {
    if (!user) return;
    const res = await api.post("/stripe/pago_suscripcion", {
      email: user.email,
    });
    window.location.href = res.data.session._data.url;
  };
  const onDelete = async () => {
    if (taskDelete?.id && user) {
      const res = await deleteTask(taskDelete.id, user.email, setTasks);
      if (res) onCloseDeleteDialog();
    }
  };
  const onCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setTaskDelete({ actividad: "" });
  };

  const onUpdateEstatus = (task:Task) => {
    if (user) updateStateTask(task.id, !task.estatus, user.email, setTasks);
  };
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-semibold">Panel de Actividades</h2>
      <form onSubmit={onSubmit}>
        <p>Registrar Actividad</p>
        <div className="flex gap-x-3">
          {task?.id != null && (
            <input type="hidden" name="id" id="id" value={task.id} readOnly />
          )}
          <div className="">
            <label htmlFor="">Fecha:</label>
            <Input
              type="date"
              id="fecha"
              name="fecha"
              required
              value={task?.fecha ?? new Date().toISOString().substring(0, 10)}
              onChange={({ target }) =>
                setTask((prev) => ({ ...prev, fecha: target.value }))
              }
            />{" "}
          </div>
          <div>
            <label htmlFor="">Actividad:</label>
            <Input
              name="actividad"
              id="actividad"
              type="text"
              required
              value={task?.actividad}
              onChange={({ target }) =>
                setTask((prev) => ({ ...prev, actividad: target.value }))
              }
            />{" "}
          </div>
          <div className="flex items-end">
            <button className="font-bold text-white bg-logo-azul hover:bg-logo-azul-oscuro p-2 rounded-md inline-flex items-center transition-[background-color] duration-150 ease-in-out cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-6 h-6 fill-current"
              >
                {task.id ? (
                  <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Z" />
                ) : (
                  <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
                )}
              </svg>
              {task.id ? "Guardar Cambios" : "Agregar"}
            </button>
            {task.id && (
              <button
                className="font-bold text-gray-700 bg-gray-200 hover:bg-gray-400 p-2 rounded-md inline-flex items-center transition-[background-color] duration-150 ease-in-out cursor-pointer"
                onClick={() => setTask({ actividad: "" })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="w-6 h-6 fill-current"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        <p>Lista de Actividades</p>
        <div className="space-y-2">
          {tasks.map((task, idx) => {
            return (
              <Actividad
                isPremium={user?.is_premium == 1}
                task={task}
                onEdit={(task) => {
                  if (!user?.is_premium)
                    return setShowDialogFuncionPremium(true);
                  setTask(task);
                }}
                onDelete={(task) => {
                  if (!user?.is_premium)
                    return setShowDialogFuncionPremium(true);
                  setShowDeleteDialog(true);
                  setTaskDelete(task);
                }}
                onUpdateEstatus={onUpdateEstatus}
                key={idx}
              />
            );
          })}
        </div>
      </div>
      <Dialog
        titulo="Función Premium"
        bgTitulo="bg-logo-morado!"
        show={showDialogFuncionPremium}
        onClose={() => {
          setShowDialogFuncionPremium(false);
        }}
      >
        <div className="p-6 space-y-1.5">
          <p>
            Esta opción solo se encuentra{" "}
            <b>disponible para usuarios que cuentan con el plan premium</b>
          </p>
          <p className="text-center">
            Si deseas mejorar tu plan y acceder a más funciones da click en el
            siguiente <b>botón</b> y suscribete para una experiencia más
            completa
          </p>
          <div className="text-center m-4">
            <button
              onClick={mejorarPlan}
              disabled={user?.is_premium == 1}
              className={clsx(
                "rounded-2xl p-2 ps-4 pe-4 font-bold cursor-pointer w-full",
                "transition-[background-color] duration-150 ease-in-out",
                "bg-logo-azul not-disabled:hover:bg-logo-azul-oscuro",
                "disabled:opacity-75 disabled:cursor-not-allowed text-white",
              )}
              type="button"
            >
              Mejorar Plan
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        titulo="Eliminar"
        bgTitulo="bg-red-700!"
        show={showDeleteDialog}
        onClose={onCloseDeleteDialog}
      >
        <div className="p-6 space-y-1.5">
          <p className="text-center">
            Confirmar eliminación de la actividad{" "}
            <b>
              <i>{taskDelete.actividad}</i>
            </b>{" "}
          </p>
          <div className="text-center m-4">
            <button
              onClick={onDelete}
              className={clsx(
                "rounded-2xl p-2 ps-4 pe-4 font-bold cursor-pointer w-full",
                "transition-[background-color,color] duration-150 ease-in-out",
                "bg-gray-100 not-disabled:hover:bg-gray-400 not-disabled:hover:text-white",
                "disabled:opacity-75 disabled:cursor-not-allowed text-black",
              )}
              type="button"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PanelActividades;
