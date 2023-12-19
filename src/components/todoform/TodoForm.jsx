import React, { useEffect, useRef, useState } from "react";
import "./todoform.css";
const TodoForm = ({ hanledeAddTask, task }) => {
  const [text, setText] = useState("");
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef(null);
  const handleSumbit = (e) => {
    e.preventDefault();
    if (!text || text === "") {
      setInvalid(true);
      inputRef.current.focus();
      return;
    }
    const taskId = task ? task?.id : "";
    hanledeAddTask(text, taskId);
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
