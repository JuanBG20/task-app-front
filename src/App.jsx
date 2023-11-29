import EditTask from "./components/EditTask";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [indice, setIndice] = useState();

  const fetchTasks = () => {
    fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then(({ tasks }) => setTasks(tasks));
  };

  useEffect(() => fetchTasks, []);

  return (
    <>
      <NewTask
        tasks={tasks}
        setTasks={setTasks}
        showNewTask={showNewTask}
        setShowNewTask={setShowNewTask}
      />
      {showEditTask && (
        <EditTask
          tasks={tasks}
          showEditTask={showEditTask}
          setShowEditTask={setShowEditTask}
          indice={indice}
        />
      )}
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        setShowNewTask={setShowNewTask}
        setShowEditTask={setShowEditTask}
        setIndice={setIndice}
      />
    </>
  );
}
