import { useEffect } from "react";
import Container from "./components/common/Container";
import tasksData from "./data/data.json";
import { useDispatch } from "react-redux";
import { setTasks } from "./store/taskSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tasksWithId = tasksData.map((task, i) => ({
      ...task,
      id: i,
      order: i,
    }));
    dispatch(setTasks(tasksWithId));
  }, [dispatch]);

  return <Container />;
}

export default App;
