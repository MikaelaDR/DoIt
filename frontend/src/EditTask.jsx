import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditTask.css";
import DatePicker from "react-datepicker"; //to have pop-up calendar
import "react-datepicker/dist/react-datepicker.css";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [isHighPriority, setIsHighPriority] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Fetch task details when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:7000/get/${id}`)
      .then((response) => {
        const {
          task,
          description,
          category,
          dueDate,
          isHighPriority,
          isComplete,
        } = response.data;
        setTask(task);
        setDescription(description);
        setCategory(category);
        setDueDate(dueDate);
        setIsHighPriority(isHighPriority);
        setIsComplete(isComplete);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:7000/edit/${id}`, {
        task,
        description,
        category,
        start,
        end,
        dueDate,
        isHighPriority,
        isComplete,
      })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="edit-task-container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit} className="form">
        <label
          className="label"
          style={{
            color: "#1E8285",
            textShadow: "2px 2px #FFF1EB",
            fontSize: 20,
          }}
        >
          Task:
          <input
            className="input"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <label
          className="label"
          style={{
            color: "#1E8285",
            textShadow: "2px 2px #FFF1EB",
            fontSize: 20,
          }}
        >
          Description:
          <input
            className="input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label
          className="label"
          style={{
            color: "#1E8285",
            textShadow: "2px 2px #FFF1EB",
            fontSize: 20,
          }}
        >
          Category:
          <select
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #124E50",
              borderRadius: "5px",
              outline: "none",
              fontSize: "larger",
              fontFamily:
                "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
              backgroundColor: "#1E8285",
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disable selected value>
              {" "}
              -- Choose Category --
            </option>
            <option value="">None</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="school">School</option>
            <option value="home">Home</option>
          </select>
        </label>
        <label
          className="label"
          style={{
            color: "#1E8285",
            textShadow: "2px 2px #FFF1EB",
            fontSize: 20,
          }}
        >
          Due Date:
          <DatePicker
            placeholderText="Select Due Date"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            showIcon
            isClearable
            closeOnScroll={true}
          />
        </label>
        <label className="checkbox-label">
          High Priority:
          <input
            type="checkbox"
            checked={isHighPriority}
            onChange={(e) => setIsHighPriority(e.target.checked)}
          />
        </label>
        <label className="checkbox-label">
          Complete:
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
        </label>
        <button type="submit" className="button">
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
