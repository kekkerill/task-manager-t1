import TaskList from "@widgets/task-list/ui/TaskList";
import TaskListHeader from "@widgets/task-list/ui/TaskListHeader";

/**
 * Главная страница со списком задач и фильтрами.
 */
function Home() {
  return (
    <>
      <TaskListHeader />
      <TaskList />
    </>
  );
}

export default Home;
