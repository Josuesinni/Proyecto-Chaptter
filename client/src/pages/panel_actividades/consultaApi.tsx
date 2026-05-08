import type { Dispatch, SetStateAction } from "react";
import { api } from "../../api";
import type { Task } from "./types";

export async function getTask(setTasks:Dispatch<SetStateAction<Task>>) {
  const res = await api.get("/tasks/user");
  setTasks(res.data.tasks)
}

export async function createTask() {}

export async function deleteTask() {}

export async function updateTask() {}
export async function updateStateTask() {}
