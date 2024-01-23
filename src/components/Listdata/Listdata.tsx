import React, { useEffect, useState } from "react";
import { MdModeEdit, MdDelete, MdCheck, MdOutlineClose } from "react-icons/md";
import { deleteTodo, updateTodo } from "../../utils/todos_api";

interface TodoItem {
  id: number;
  description: string;
}

interface ListdataProps {
  item: TodoItem;
  fetchTodos: any;
}

const Listdata: React.FC<ListdataProps> = ({ item, fetchTodos }) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [editableTask, setEditableTask] = useState<string>(item.description);
  const [editableTaskValid, setEditableTaskValid] = useState<boolean>(true)

  const handleActivity = async (activity: string) => {
    if (activity === "delete") {
      try {
        const response = await deleteTodo(item.id);
        if (response) fetchTodos();

      } catch (error) {
        console.error("Error deleting todos:", error);
      }
    } else if (activity === "update") {
      setIsEditable(false);
    } else if (activity === "save") {
      try {
        const response = await updateTodo(item.id, editableTask);
        if (response) fetchTodos();
        setIsEditable(true);
      } catch (error) {
        console.error("Error updating todos:", error);
      }
    } else {
      setIsEditable(true);
      setEditableTask(item.description);
    }
  };

  useEffect(() => {
    if (editableTask.length) {
      setEditableTaskValid(true)
    } else {
      setEditableTaskValid(false)
    }
  }, [editableTask])

  return (
    <div key={item.id}>
      <div className="list-data">
        <input
          type="text"
          className="data-input"
          disabled={isEditable}
          value={editableTask}
          onChange={(e) => setEditableTask(e.target.value)}
        />
        {isEditable ? (
          <>
            <button
              className="bnt-edit"
              onClick={() => handleActivity("update")}
            >
              <MdModeEdit />
            </button>
            <button
              className="bnt-delete"
              onClick={() => handleActivity("delete")}
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button
              className={!editableTaskValid ? 'bnt-check valid-btn' : 'bnt-check '}
              onClick={() => handleActivity("save")}
              disabled={!editableTaskValid}
            >
              <MdCheck />
            </button>
            <button
              className="bnt-close"
              onClick={() => handleActivity("cancle")}
            >
              <MdOutlineClose />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Listdata;
