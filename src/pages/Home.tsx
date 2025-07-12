import TaskList from "../components/TaskList";
import TaskListHeader from "../components/TaskListHeader";

function Home({
  modalOpen,
  setModalOpen
}: {
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
}) {
  return (
    <>
      <TaskListHeader onCreate={() => setModalOpen(true)} />
      <TaskList modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default Home;
