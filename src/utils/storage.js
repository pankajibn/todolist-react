export const storeDataLocal = (data,key="todolist") => {
    const values = JSON.stringify(data);
    localStorage.setItem(key, values);
}

export const getRecordsfromLocal = (key="todolist") => {
    const data = localStorage.getItem(key);
    if(data) {
        return JSON.parse(data);
    }
}