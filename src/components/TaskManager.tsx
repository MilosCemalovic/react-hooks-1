import { FormEvent, useCallback, useMemo, useState } from "react"
import { Task } from "../types/types"
import styles from "./TaskManager.module.css"

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Cache (memoize) filtered list until dependencies change
  const filteredTasks = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()

    // Check both title and description
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
    )
  }, [tasks, searchTerm]) // Recalculate when these change

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
              ...task, // Copy existing properties
              completed: !task.completed, // Override this property
            }
          : task
      )
    )
  }, [])

  const deleteTask = useCallback((taskId: number) => {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId)) // Keep tasks that DON'T match the ID
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // User might enter only whitespace - .trim() removes whitespace from both ends
    if (!newTitle.trim()) return

    // Create new array with existing items + new task
    setTasks((prevTask) => [
      ...prevTask,
      {
        id: Date.now(),
        title: newTitle.trim(), // Clean input
        description: newDescription.trim(), // Clean textarea
        completed: false,
      },
    ])

    setNewTitle("")
    setNewDescription("")
  }

  return (
    <div className={styles.wrapper}>
      <h1>Task Manager</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks ..."
      />

      <form onSubmit={handleSubmit} className={styles.wrapper}>
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

            <button
              className={styles.buttonLeft}
              onClick={() => toggleComplete(task.id)}
            >
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
