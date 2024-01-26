import React, { useEffect, useRef, useState } from "react";
import "./todoform.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setTask, updateTask } from "../../store/taskSlice";
import { setMessage, setVisible } from "../../store/alertSlice";
const TodoForm = () => {
  const [text, setText] = useState("");
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef(null);
  const task = useSelector((state) => state.tasks.task);

  const dispatch = useDispatch();

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
      };
      dispatch(updateTask(taskObj));
      alertMessage = `Task has been updated successfully!`;
    } else {
      taskObj = {
        title: text,
      };
      dispatch(addTask(taskObj));
      alertMessage = `Task has been added successfully!`;
    }
    dispatch(setTask(null));
    dispatch(setMessage(alertMessage));
    dispatch(setVisible(true));
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
