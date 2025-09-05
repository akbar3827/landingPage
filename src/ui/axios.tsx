import { AxiosIntegrateAPI } from "./hooks/axios";
import { useState, useEffect } from "react";

type TypeTodos = {
  id: string;
  name: string;
  title: string;
  completed: boolean;
};

export const AxiosAPI = () => {
  // UNTUK MEMBUAT DATA
  const [loadTodos, setLoadTodos] = useState(false);
  const [todos, setTodos] = useState<TypeTodos[]>([]);

  // MENAMBAHKAN CARD TODOS
  const [inputName, setInputName] = useState("");
  const [inputCompleted, setInputCompleted] = useState(false);
  const [ErrorMasssage, setErrorMassage] = useState("");

  // ERROR MASSAGE
  // const [deleteTodos, setDeleteTodos] = useState(false);
  const [DeleteTodosErr, setDeleteTodosErr] = useState("");

  // FOR EDIT INPUT TEXT
  const [selectId, setSelectId] = useState("");
  const [editNameInput, setEditNameInput] = useState("");
  const [editTitleInput, setEditTitleInput] = useState("");
  const [editInputCompleted, setEditInputCompleted] = useState(false);
  const [loadEditInput, setLoadEditInput] = useState(false);
  const [EditInputErr, setEditInputErr] = useState("");

  // FUNCTION TODOS
  const AxiosAPI = async () => {
    try {
      setLoadTodos(true);
      const response = await AxiosIntegrateAPI.get<TypeTodos[]>("/todos");
      setTodos(response.data);
    } catch (error) {
      setErrorMassage((error as TypeError).message);
    } finally {
      setLoadTodos(false);
    }
  };

  useEffect(() => {
    AxiosAPI();
  }, []);
  // END TODOS FUNCTION

  // FUNCTION CREATE TODOS
  const handleCreateAxios = async () => {
    try {
      if (inputName !== "") {
        setErrorMassage("");
      }
      setLoadTodos(true);
      if (inputName === "") {
        setErrorMassage("input must not be empty");
      }
      await AxiosIntegrateAPI.post("/todos", {
        title: inputName,
        completed: inputCompleted,
      });
    } catch (error) {
      setErrorMassage((error as TypeError).message);
    } finally {
      setLoadTodos(false);
    }
  };
  // END CREATE FUNCTION

  // FUNCTION DELETE TODOS
  const DeleteTodos = async (id: string) => {
    try {
      // setDeleteTodos(true)
      await AxiosIntegrateAPI.delete(`/todos/${id}`);
    } catch (error) {
      setDeleteTodosErr((error as TypeError).message);
    } finally {
      // setDeleteTodos(false)
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    await DeleteTodos(id);
    await AxiosAPI();
  };
  // END DELETE FUNCTION

  
  // FUNCTION EDIT TODOS
  const editTodos = async (payload: {
    name?: string;
    title?: string
    completed?: boolean}) => {
    try {
      setLoadEditInput(true);
      if (editTitleInput !== "") {
        setEditInputErr("");
      }
      if (editTitleInput === "") {
        setEditInputErr("input must not be empty");
      }
      await AxiosIntegrateAPI.patch(`/todos/${selectId}`, {
        name: payload.name,
        title: payload.title,
        completed: payload.title
      });
    } catch (error) {
      setEditInputErr((error as TypeError).message);
    } finally {
      setLoadEditInput(false);
    }
  };

  const handleEditTodos = async () => {
    try {
      if (selectId && (editTitleInput || editNameInput)) {
        await editTodos({
          name: editNameInput,
          title: editTitleInput
        });
      };
      await AxiosAPI();
      setEditTitleInput("");
      setSelectId("");
    } catch (error) {
      setErrorMassage((error as TypeError).message);
    }
  };
  // END EDIT TODOS FUNCTION

  // HTML
  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-center gap-40">
        <div className="flex flex-col items-center justify-center">
          <input
            className="p-2 m-4 rounded-md"
            type="text"
            placeholder="Create Todos"
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
          <div>
            <input
              className="mx-1 my-4 rounded-md"
              type="checkbox"
              checked={inputCompleted}
              onChange={(e) => setInputCompleted(e.target.checked)}
            />
            Completed
          </div>
          <div className="mb-10 flex justify-center items-center flex-col">
            <button
              disabled={loadTodos}
              onClick={handleCreateAxios}
              className="p-4 rounded-md bg-blue-800 text-white hover:bg-blue-500"
            >
              {loadTodos ? "Loading..." : "Create todos"}
            </button>
            <br />
            <p className="text-xs text-red-600 relative bottom-4">
              {ErrorMasssage}
            </p>
          </div>
        </div>

        {/* INPUT EDIT */}
        <div className="flex flex-col items-center justify-center pb-6">

          <div>
            <label htmlFor="name"> Edit name : <br />
            <input
              id="name"
              className="p-2 mb-4 mt-1 rounded-md"
              type="text" 
              placeholder="Edit Todos"
              onChange={(e) => setEditNameInput(e.target.value)}
              value={editNameInput}
            />
            </label>
          </div>

          <div>
            <label htmlFor="title"> Edit title : <br />
            <input
            id="title"
              className="p-2 mb-7 mt-1 rounded-md"
              type="text"
              placeholder="Edit Todos"
              onChange={(e) => setEditTitleInput(e.target.value)}
              value={editTitleInput}
            />
            </label>
          </div>

          <div>
            <input
              className="mx-1 my-4 rounded-md"
              type="checkbox"
              checked={editInputCompleted}
              onChange={(e) => setEditInputCompleted(e.target.checked)}
            />
            Completed
          </div>

          <div className="mb-8 flex justify-center items-center flex-col">
            <button
              className="p-4 mb-2 rounded-md bg-blue-800 text-white hover:bg-blue-500"
              onClick={handleEditTodos}
              disabled={loadEditInput || !selectId}
            >
              {loadEditInput ? "Loading..." : "Edit Todos"}
            </button>
            <p className="text-xs text-red-500">{ErrorMasssage}</p>
          </div>
        </div>
      </div>
      {/* <button
        className="p-4 bg-blue-800 text-white hover:bg-blue-600 rounded-md"
        onClick={AxiosAPI}
      >
        {loadTodos ? "Loading..." : "Todos"}
      </button> */}
      <div className="flex justify-center text-center items-center gap-2.5 flex-row flex-wrap p-10 m-8 transition-all delay-500">
        {todos.map((m) => {
          return (
            <div
              className="bg-blue-900 text-white w-50 rounded-xl px-1 pt-4 pb-2 transition-all delay-500 "
              key={m.id}
            >
              <p>
                <b>Name : </b>
                {m.name}
              </p>
              <p>
                <b>Title : </b>
                {m.title}
              </p>
              <p>
                <b>Complete? </b>
                {m.completed ? "sudah" : "belum"}
              </p>
              <input
                onChange={() => setSelectId(m.id)}
                type="radio"
                name="todos-edit"
              />{" "}
              {/* Nama input harus sama semua,
               tidak boleh berbeda, ex : {m.id}, jika seperti ini bisa menyelect semua*/}
              <button
                onClick={() => handleDeleteEmployee(m.id)}
                className="bg-gray-400 text-black p-2 text-xs rounded-md mt-3 ml-25"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
  // END HTML
};
