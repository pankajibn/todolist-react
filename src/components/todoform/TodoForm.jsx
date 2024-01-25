import React, { useEffect, useRef, useState } from "react";
import "./todoform.css";
import { useTasks, useTasksDispatch } from "../../context/tasksContext";
const TodoForm = () => {
  const [text, setText] = useState("");
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef(null);
  const { task, setTask, setMessage } = useTasks();
  const dispatch = useTasksDispatch();

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!text || text === "") {
      setInvalid(true);
      inputRef.current.focus();
      return;
    }

    let taskObj;
    let alertMessage = ``;
    if (task) {
      taskObj = {
        ...task,
        title: text,
        type: "changed",
      };
      alertMessage = `Task has been updated successfully!`;
    } else {
      taskObj = {
        title: text,
        type: "added",
      };
      alertMessage = `Task has been added successfully!`;
    }

    dispatch(taskObj);
    setTask();
    setMessage(alertMessage);
    setText("");
  };

  const handleChange = (e) => {
    const taskValue = e.target.value;
    if (taskValue?.length === 0) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
    setText(taskValue);
  };

  useEffect(() => {
    setText(task?.title);
  }, [task?.id]);

  return (
    <div className="form_container">
      <form method="post" onSubmit={handleSumbit}>
        <div className="form_wrapper">
          <div className="form_input_row">
            <input
              ref={inputRef}
              type="text"
              className={`taskinput ${invalid ? `invalid` : `valid`}`}
              placeholder="Write your task here..."
              autoComplete="off"
              name="task"
              value={text}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <button className="add_btn">{task ? `UPDATE` : `ADD`}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
