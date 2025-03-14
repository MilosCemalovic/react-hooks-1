const TaskManager = () => {
  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" placeholder="Search tasks ..." />

      <form>
        <input type="text" placeholder="Task title" />
        <textarea placeholder="Task description" />
        <button>Add task</button>
      </form>

      <div>
        <p>Total tasks: 0</p>
        <p>Completed: 0</p>
      </div>

      {/* <ul>

      </ul> */}
    </div>
  )
}

export default TaskManager
