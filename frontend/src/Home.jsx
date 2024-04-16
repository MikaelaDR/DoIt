import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import logo from "./assets/doitLogo6.png";
import moment from "moment"; //for time format
import { Link } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  PinterestIcon,
  WhatsappIcon,
} from "react-share";
import backgroundImage from "./assets/background.jpg";

function Home() {
  const [todos, setTodos] = useState([]);
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [isComplete, setIsComplete] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'completed', 'incomplete'
  const [filterPriority, setFilterPriority] = useState(false); // true for high priority only, false for all
  const currentPageUrl = "http://localhost:5173/";

  useEffect(() => {
    axios
      .get("http://localhost:7000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  //Handles loading changes, but is not EDITOR of tasks
  const handleUpdate = (id) => {
    axios
      .put("http://localhost:7000/update/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:7000/delete/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    axios
      .put("http://localhost:7000/edit/" + id, {
        task: task,
        description: description,
        category: category,
        dueDate: dueDate,
        start: start,
        end: end,
        isHighPriority: isHighPriority,
      })
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Share Icons */}
      <div
        style={{
          // backgroundColor: "#FFF1EB",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ padding: "10px" }}>
          <EmailShareButton url={currentPageUrl}>
            <EmailIcon round={true} size={55} />
          </EmailShareButton>
        </div>

        <div style={{ padding: "5px" }}>
          <WhatsappShareButton url={currentPageUrl}>
            <WhatsappIcon round={true} size={55} />
          </WhatsappShareButton>
        </div>

        <div style={{ padding: "5px" }}>
          <FacebookShareButton url={currentPageUrl}>
            <FacebookIcon round={true} size={55} />
          </FacebookShareButton>
        </div>

        <div style={{ padding: "5px" }}>
          <PinterestShareButton url={currentPageUrl}>
            <PinterestIcon round={true} size={55} />
          </PinterestShareButton>
        </div>

        <div style={{ padding: "5px" }}>
          <LinkedinShareButton url={currentPageUrl}>
            <LinkedinIcon round={true} size={55} />
          </LinkedinShareButton>
        </div>

        <div style={{ padding: "5px" }}>
          <TwitterShareButton url={currentPageUrl}>
            <TwitterIcon round={true} size={55} />
          </TwitterShareButton>
        </div>
      </div>
      <img src={logo} alt="Logo" style={{ width: "200px", height: "auto" }} />
      <h2>To do List</h2>


      <div>
        <Create />
      </div>
      {/* FILTERING */}
      <div name="FilteringSection">
        <h2 style={{ textAlign: 'center'}}>Filter Tasks</h2>
        <div>
          <label>
            Show:
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </label>
          <label>
            High Priority Only:
            <input
              type="checkbox"
              checked={filterPriority}
              onChange={(e) => setFilterPriority(e.target.checked)}
            />
          </label>
        </div>
      </div>

      {todos.length === 0 ? (
        <div>
          <h2>No record</h2>
        </div>

      ) : (
        todos
          .filter((todo) => {
            if (filterStatus === "completed") return todo.isComplete;
            if (filterStatus === "incomplete") return !todo.isComplete;
            return true;
          })
          .filter((todo) => {
            return filterPriority ? todo.isHighPriority : true;
          })
          
          .map((todo) => (
            <div className="task">
              <div
                className="checkbox"
                style={{ justifyContent: "space-between" }}
              >
                <div className="checkbox" style={{}}>
                  {/* Fill circle if todo is done
                            {todo.isComplete? 
                            <BsFillCheckCircleFill className='icon'/>
                            :
                            <BsCircleFill className='icon'/>
                            } */}

                  {/* IsComplete Checkbox */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={todo.isComplete}
                      //onClick={handleIsComplete}
                      onChange={(e) => {
                        setIsComplete(!isComplete);
                        {
                          handleUpdate(todo._id);
                        }
                      }}
                    />

                    {/* Render exclamation mark if high priority */}
                    {todo.isHighPriority && (
                      <span
                        className="priority-indicator"
                        style={{ fontSize: 30 }}
                      >
                        !
                      </span>
                    )}
                  </div>

                  {/* Task - Strikethrough + grey out if isComplete:True */}
                  <p
                    className={todo.isComplete ? "line_through" : ""}
                    style={{
                      textTransform: "capitalize",
                      color: todo.isComplete ? "grey" : "white",
                    }}
                  >
                    {todo.task}
                  </p>
                </div>

                {/* Edit and Delete Icons */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link style={{ color: "white" }} to={"/edit/" + todo._id}>
                    <span>
                      <FaEdit
                        className="icon"
                        onClick={() => handleEdit(todo._id)}
                      />
                    </span>
                  </Link>

                  <span style={{ color: "white" }}>
                    <BsFillTrashFill
                      className="icon"
                      onClick={() => handleDelete(todo._id)}
                    />
                  </span>
                </div>
              </div>

              <div>
                {/* Description */}
                <div>
                  <p
                    style={{
                      color: "#1E8285",
                      textShadow: "2px 2px #FFF1EB",
                      fontSize: 20,
                      textAlign: 'center',
                    }}
                  >
                    Description
                  </p>
                </div>
                <p style={{textAlign: 'center'}}>{todo.description}</p>
              </div>

              {/* Category */}
              <div>
                <p
                  style={{
                    color: "#1E8285",
                    textShadow: "2px 2px #FFF1EB",
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                >
                  Category
                </p>
              </div>
              <p style={{ textTransform: "capitalize", textAlign: 'center', }}> {todo.category}</p>

              {/* Due Date */}
              <div>
                <p
                  style={{
                    color: "#1E8285",
                    textShadow: "2px 2px #FFF1EB",
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                >
                  Due Date
                </p>
              </div>

              <div>
              <p style={{textAlign: 'center'}}>{moment(todo.dueDate).format("MMM Do YYYY")}</p>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default Home;
