import type { Dispatch, SetStateAction } from "react";
import { api, sendAxios } from "../../api";
import type { CreateTask, Task } from "./types";

export async function getTasks(
  setTasks: Dispatch<SetStateAction<Task[]>>,
  email: string,
) {
  const res = await api.get(`/tasks/${email}`);
  console.log(res.data);
  setTasks(res.data.tasks);
}

export async function createTask(
  task: CreateTask,
  setTasks: Dispatch<SetStateAction<Task[]>>,
  email: string,
) {
  const res = await sendAxios({
    url: `/task/${email}`,
    method: "POST",
    data: task,
  });
  //const res = await api.post(`/task/${email}`, { data: task });
  if (res.data.success) {
    const task = res.data.task;
    setTasks((prev) => [...prev, task]);
  }
  return res.data.success;
}

export async function deleteTask(
  id: number,
  email: string,
  setTasks: Dispatch<SetStateAction<Task[]>>,
) {
  const res = await sendAxios({
    url: `/task/${email}/${id}`,
    method: "DELETE",
  });
  //const res = await api.delete(`/task/${email}/${id}`);
  if (res.data.success) {
    setTasks((prev) => prev.filter((task) => task.id != id));
  }
  return res.data.success;
}

export async function updateTask(
  task: Task,
  email: string,
  setTasks: Dispatch<SetStateAction<Task[]>>,
) {
  const res = await sendAxios({
    url: `/task/${email}/${task.id}`,
    method: "PUT",
    data: task,
  });
  //const res = await api.put(`/task/${email}/${task.id}`, { data: task });
  if (res.data.success) {
    setTasks((prev) =>
      prev.map((t) =>
        Number(t.id) === Number(task.id) ? { ...t, ...task } : t,
      ),
    );
  }
}
export async function updateStateTask(
  id: number,
  estatus: boolean,
  email: string,
  setTasks: Dispatch<SetStateAction<Task[]>>,
) {
  const res = await sendAxios({
    url: `/task/${email}/${id}`,
    method: "PATCH",
    data: { estatus },
  });

  //const res = await api.patch(`/task/${email}/${id}`, { data: estatus });
  if (res.data.success) {
    setTasks((prev) =>
      prev.map((t) =>
        Number(t.id) === Number(id) ? { ...t, estatus: estatus } : t,
      ),
    );
  }
}
