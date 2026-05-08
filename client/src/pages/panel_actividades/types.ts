export interface Task{
    id:number;
    fecha:string;
    actividad:string;
    estatus:boolean;
}

export type CreateTask = Omit<Task,"id">


export interface IActividad{
    isPremium:boolean;
    task:Task,
    onEdit:(task:Task)=>void;
    onDelete:(task:Task)=>void;
    onUpdateEstatus:(task:Task)=>void;
}