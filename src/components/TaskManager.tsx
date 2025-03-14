import { FormEvent, useState } from "react"
import { Task } from "../types/types"

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!newTitle.trim()) return

    setTasks((prevTask) => [
      ...prevTask,
      {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        completed: false,
      },
    ])

    setNewTitle("")
    setNewDescription("")
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Task title"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Task description"
        />
        <button type="submit">Add task</button>
      </form>

      <div>
        <p>Total tasks: 0</p>
        <p>Completed: 0</p>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h1>{task.title}</h1>

            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskManager
