import { storeDataLocal } from "./storage";

export default function taskReducer(tasks, payload) {
    switch (payload.type) {
        case "added": {
            const taskId =
            tasks && tasks.length > 0
              ? Math.max(...tasks?.map((item) => item.id)) + 1
              : 1;
              const newTask = { id: taskId, title: payload.title, isCompleted: false };
              const availableTasks = [...tasks, newTask];
              storeDataLocal(availableTasks);
              return availableTasks;
        }
       case "changed": {
        const tasksList = tasks.map(item => item.id === payload.id ? {...item, title:payload.title, isCompleted: payload.isCompleted} : item)
        storeDataLocal(tasksList);
        return tasksList;
       }
       case "deleted": {
        const tasksList = tasks.filter(item => item.id != payload.id);
        storeDataLocal(tasksList);
        return tasksList;
       }
        default:
        throw Error("Unknow Action.")
    }
    
}  