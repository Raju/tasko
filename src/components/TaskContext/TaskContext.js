import { createContext, useEffect, useContext, useState } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const sortTasksByFavorite = (tasks) => {
    const favoriteTasks = tasks?.filter((task) => task.favorite);
    const nonFavoriteTasks = tasks?.filter((task) => !task.favorite);

    return [...favoriteTasks, ...nonFavoriteTasks];
  };


  const updateTasks = (newTasks) => {
    const sortedTasks = sortTasksByFavorite(newTasks);
    setTasks(sortedTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const sortedTasks = sortTasksByFavorite(storedTasks);

    if (storedTasks) setTasks(sortedTasks);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}

export {useTasks};

export default TaskProvider;
