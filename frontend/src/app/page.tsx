"use client";

import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "@/services/api";

import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

const handleAddTask = async () => {
  if (!title.trim()) {
    alert("Task title is required");
    return;
  }

  try {
    await createTask({
      title,
      description,
    });

    setTitle("");
    setDescription("");

    loadTasks();
  } catch (error) {
    console.error(error);
    alert("Unable to add task");
  }
};

  const handleDelete = async (id: number) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  try {
    await deleteTask(id);
    loadTasks();
  } catch (error) {
    console.error(error);
    alert("Unable to delete task");
  }
};

const handleToggle = async (id: number) => {
  try {
    await toggleTask(id);
    loadTasks();
  } catch (error) {
    console.error(error);
    alert("Unable to update task");
  }
};


const handleEdit = (task: Task) => {
  setEditingId(task.id);
  setEditTitle(task.title);
  setEditDescription(task.description);
};

const handleSave = async () => {
  if (editingId === null) return;

  try {
    const currentTask = tasks.find((t) => t.id === editingId);

    if (!currentTask) return;

    await updateTask(editingId, {
      title: editTitle,
      description: editDescription,
      completed: currentTask.completed,
    });

    setEditingId(null);
    setEditTitle("");
    setEditDescription("");

    loadTasks();
  } catch (error) {
    console.error(error);
    alert("Unable to update task");
  }
};


  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <main
  className={`min-h-screen transition-all duration-500 ${
    darkMode
      ? "bg-slate-900 text-white"
      : "bg-slate-100 text-black"
  }`}
>

      {/* Header */}

      <div
  className={`relative py-10 shadow-lg transition-all duration-500 ${
    darkMode
      ? "bg-slate-800 text-white"
      : "bg-blue-700 text-white"
  }`}
>

<div className="absolute top-6 right-8">
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-white text-black px-5 py-2 rounded-full shadow-lg hover:scale-105 transition"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  </div>

        <h1 className="text-6xl font-bold text-center">
          Smart Todo Manager
        </h1>

        <p className="text-center text-2xl mt-4">
          Full Stack Project | FastAPI + Next.js + MySQL
        </p>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        {/* Add Task */}

        <div
  className={`rounded-2xl shadow-lg p-8 mb-10 transition-all duration-300 ${
    darkMode ? "bg-slate-800" : "bg-white"
  }`}
>

          <h2 className="text-5xl font-bold mb-8">
            Add New Task
          </h2>

          <input
  type="text"
  placeholder="Task Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className={`w-full rounded-lg p-4 border ${
    darkMode
      ? "bg-slate-700 text-white placeholder-gray-300"
      : "bg-white text-black placeholder-gray-500"
  }`}
/>

          <textarea
  placeholder="Task Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={5}
  className={`w-full rounded-lg p-4 border text-xl mb-5 ${
    darkMode
      ? "bg-slate-700 text-white placeholder-gray-300"
      : "bg-white text-black placeholder-gray-500"
  }`}
/>

          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-bold"
          >
            + Add Task
          </button>

        </div>

        {/* Dashboard */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div
  className={`shadow rounded-xl p-8 text-center transition-all duration-300 ${
    darkMode ? "bg-slate-800" : "bg-white"
  }`}
>

            <h3 className="text-3xl font-bold">
              Total
            </h3>

            <p className="text-6xl font-bold mt-4">
              {total}
            </p>

          </div>

          <div className="bg-yellow-100 shadow rounded-xl p-8 text-center">

            <h3 className="text-3xl font-bold">
              Pending
            </h3>

            <p className="text-6xl font-bold mt-4 text-yellow-700">
              {pending}
            </p>

          </div>

          <div className="bg-green-100 shadow rounded-xl p-8 text-center">

            <h3 className="text-3xl font-bold">
              Completed
            </h3>

            <p className="text-6xl font-bold mt-4 text-green-700">
              {completed}
            </p>

          </div>

        </div>

        {/* Task List */}

        <h2 className="text-5xl font-bold mb-8">
          Tasks
        </h2>

        {tasks.length === 0 ? (

          <div
  className={`p-10 rounded-xl shadow text-center text-2xl transition-all duration-300 ${
    darkMode ? "bg-slate-800" : "bg-white"
  }`}
>
            No Tasks Found
          </div>

        ) : (

          tasks.map((task) => (

            <div
  key={task.id}
  className={`rounded-xl shadow-lg p-8 mb-6 hover:shadow-2xl transition-all duration-300 ${
    darkMode ? "bg-slate-800" : "bg-white"
  }`}
>

              {editingId === task.id ? (

  <input
    value={editTitle}
    onChange={(e) => setEditTitle(e.target.value)}
    className="w-full border rounded-lg p-3 text-2xl font-bold"
  />

) : (

  <h3
  className={`text-3xl font-bold ${
    task.completed
      ? "line-through text-gray-500"
      : darkMode
      ? "text-white"
      : "text-black"
  }`}
>
  {task.title}
</h3>
)}

             {editingId === task.id ? (

  <textarea
    value={editDescription}
    onChange={(e) => setEditDescription(e.target.value)}
    className="w-full border rounded-lg p-3 mt-4"
    rows={3}
  />

) : (

  <p
  className={`text-xl mt-4 ${
    task.completed
      ? "line-through text-gray-400"
      : darkMode
      ? "text-gray-300"
      : "text-gray-600"
  }`}
>
  {task.description}
</p>

)}
              <p className="mt-5 text-xl">

                <span className="font-bold">
                  Status:
                </span>

                <span
                  className={`ml-3 font-bold ${
                    task.completed
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {task.completed
                    ? "Completed"
                    : "Pending"}
                </span>

              </p>

              <div className="flex gap-4 mt-8">

                <button
  onClick={() => handleToggle(task.id)}
  className={`px-6 py-3 rounded-lg text-white font-bold ${
    task.completed
      ? "bg-gray-600 hover:bg-gray-700"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {task.completed ? "↩ Mark Pending" : "✔ Complete"}
</button>

                {editingId === task.id ? (

  <button
    onClick={handleSave}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
  >
    💾 Save
  </button>

) : (

  <button
    onClick={() => handleEdit(task)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
  >
    ✏ Edit
  </button>

)}

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </main>
  );
}