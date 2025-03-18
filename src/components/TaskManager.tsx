import { FormEvent, useCallback, useMemo, useState } from "react"
import { Task } from "../types/types"

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [tasks, searchTerm]
  )

  const { total, completed } = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
    }),
    [tasks]
  )

  const toggleComplete = useCallback((taskId: number) => {
    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    )
  }, [])

  const deleteTask = useCallback((taskId: number) => {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId))
  }, [])

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

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks ..."
      />

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
        <p>Total tasks: {total}</p>

        <p>Completed: {completed}</p>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              opacity: task.completed ? 0.6 : 1,
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskManager
