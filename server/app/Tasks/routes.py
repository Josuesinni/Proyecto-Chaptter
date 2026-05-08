from typing import List

from fastapi import APIRouter, Request

from database import SessionLocal
from app.Users.routes import getIdUsuario
from app.Tasks.schemas import TaskSchema
from app.Tasks.models import Task
from app.UsersLogs.models import UserLogs

routerTask = APIRouter()

@routerTask.get("/tasks/{email}",)# response_model=List[TaskSchema]
async def getTasks(email: str):
    idUser = getIdUsuario(email)
    session = SessionLocal()
    tasks = session.query(Task).filter(Task.idUser == idUser).all()
    return {"success":True, "tasks":tasks}
    
@routerTask.post("/task/{email}",status_code=201)
async def create(email:str,request:Request):
    idUser = getIdUsuario(email)
    payload = await request.json()
    fecha=payload["fecha"]
    actividad=payload["actividad"]
    db= SessionLocal()
    print(fecha,actividad)
    try:
        nuevatarea=Task(fecha=fecha,actividad=actividad,idUser=idUser)
        db.add(nuevatarea)
        log=UserLogs(idUser=idUser,accion=1)
        db.add(log)
        db.commit()
        db.refresh(nuevatarea)
        print(nuevatarea)
        return {
            "success": True, 
            "task":{
                "id": nuevatarea.id,
                "fecha": nuevatarea.fecha,
                "actividad": nuevatarea.actividad,
                "estatus": False,
                "idUser": nuevatarea.idUser
            } 
        }
    except Exception as e:
        db.rollback()
        print("Error:", e)
        return {"success": False}
    finally:
        db.close()

@routerTask.put("/task/{email}/{id}",status_code=201)
async def udpate(email:str, id:int, request:Request):
    idUser = getIdUsuario(email)
    payload = await request.json()
    fecha=payload["fecha"]
    actividad=payload["actividad"]
    db= SessionLocal()
    try:
        tarea = db.query(Task).filter(Task.id == id, Task.idUser == idUser).first()
        if(tarea is None): return {"success":False}
        tarea.fecha = fecha
        tarea.actividad = actividad
        log=UserLogs(idUser=idUser,accion=2)
        db.add(log)
        db.commit()
        db.refresh(tarea)
        return {
            "success": True, 
            "task":{
                "id": id,
                "fecha": fecha,
                "actividad": actividad,
                "estatus": tarea.estatus,
                "idUser": tarea.idUser
            } 
        }
    except Exception as e:
        db.rollback()
        print("Error:", e)
        return {"success": False}
    finally:
        db.close()

@routerTask.patch("/task/{email}/{id}",status_code=201)
async def updateStatus(email:str,id:int,request:Request):
    idUser = getIdUsuario(email)
    payload = await request.json()
    estatus=payload["estatus"]
    db= SessionLocal()
    try:
        tarea = db.query(Task).filter(Task.id == id, Task.idUser == idUser).first()
        if(tarea is None): return {"success":False}
        tarea.estatus = estatus
        log=UserLogs(idUser=idUser,accion=3)
        db.add(log)
        db.commit()
        db.refresh(tarea)
        return {
            "success": True, 
            "task":{
                "id": id,
                "estatus": tarea.estatus,
            } 
        }
    except Exception as e:
        db.rollback()
        print("Error:", e)
        return {"success": False}
    finally:
        db.close()

@routerTask.delete("/task/{email}/{id}",status_code=201)
async def delete(email:str,id:int,request:Request):
    idUser = getIdUsuario(email)
    db= SessionLocal()
    try:
        tareaAEliminar = db.query(Task).filter(Task.id == id, Task.idUser == idUser).first()
        db.delete(tareaAEliminar)
        log=UserLogs(idUser=idUser,accion=4)
        db.add(log)
        db.commit()
        return {
            "success": True, 
            "task":{
                "id": id,
            } 
        }
    except Exception as e:
        db.rollback()
        print("Error:", e)
        return {"success": False}
    finally:
        db.close()