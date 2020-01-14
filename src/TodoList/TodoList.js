import React, {useState} from "react";
import "./TodoList.scss"

//https://medium.com/@anjubudhwan/create-todo-app-using-react-hooks-1048f74bd4a7

const TodoList = () => {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoListDone, setTodoListDone] = useState([]);

  const changeHandler = event => {
    setTask(event.target.value);
  };

  const addTaskHandler = e => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTodoList(todoList.concat(task));
      setTask("")
    }
  };

  const removeHandler = index => {
    const doneElem = todoList.find((item, itemIndex) => {
      return itemIndex === index;
    });

    const newArr = todoList.filter((item, itemIndex) => {
      return itemIndex !== index;
    });

    setTodoList(newArr);
    if(doneElem) todoListDone.push(doneElem);
  };

   const onDragOverTask = (e) => {
    e.preventDefault();
   }

   const onDragStartTask = (index, e) => {
    e.dataTransfer.setData("itemIndex", index);
   }

   const onDropTask = (e) => {
  
    let index = parseInt(e.dataTransfer.getData("itemIndex"));

    const doneElem = todoList.find((item, itemIndex) => {
      return itemIndex === index;
    });

    const newArr = todoList.filter((item, itemIndex) => {
      return itemIndex !== index;
    });

    setTodoList(newArr);
    if(doneElem) todoListDone.push(doneElem);
  }

  const taskList = todoList.map((item, index) => {
    return (
      <li key={index} className="draggable" draggable onDragStart={(e)=> onDragStartTask(index, e)}>
            <div className="card" >
              <div className="card-body">
                <h5 className="card-title">{item}</h5>
                <button className="card-link btn btn-danger" onClick={(e) => removeHandler(index)}>Done</button>
              </div>
            </div>
        </li>
    );
  });

  const finishTasks = todoListDone.map((item, index) => {
    return (
      <li key={index}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title line_finish">{item}</h5>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 todo_button">
              <form className="form-inline" onSubmit={addTaskHandler}>
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="addTask" className="sr-only">Task</label>
                  <input type="text" className="form-control" id="addTask" onChange={changeHandler} placeholder="Add Task" value={task} />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Add Task</button>
              </form>
        </div>
        <div className="col-md-6 box_of_task">
            <div className="innerBox">
              <h1>Task that need to be done</h1>
              <ul>{taskList}</ul>
            </div>
        </div>
        <div className="col-md-6 box_of_task">
            <div className="innerBox">
              <h1>Finished tasks</h1>
              <ul onDragOver={(e)=>onDragOverTask(e)} onDrop={(e)=>onDropTask(e)}>{finishTasks}</ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
