"use client";
import { FaPen, FaTrash, FaSave } from "react-icons/fa";
import { handleDeleteNote, handleEditNote } from "@/services/notes";
import { alertMessage } from "../Alert";
import { useState } from "react";

interface UpdateNote {
  (text: any): void;
}

interface notesData {
  author: string;
  created_at: string;
  id: number;
  post: string;
}

interface NoteProps {
  id: number;
  text: string;

  updatesNotes: UpdateNote;
  notes: notesData[];
}

const Note = ({ id, text, notes, updatesNotes }: NoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteValue, setNoteValue] = useState(text);

  const handleDeleteNotes = async () => {
    const {
      data: { status },
    } = await handleDeleteNote(id);

    if (status === 200) {
      alertMessage.success("Note deleted successfully");

      const newNotes = notes.filter((note: any) => note.id !== id);

      await updatesNotes(newNotes);
    } else {
      alertMessage.error("Note couldn't be deleted");
    }
  };

  const handleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  const handleChangeInput = (input: any) => {
    setNoteValue(() => input.target.value);
  };

  const handleUpdate = async () => {
    if (noteValue !== "") {
      const {
        data: { body, status },
      } = await handleEditNote(id, noteValue);

      if (status === 200) {
        setIsEditing((prevEditing) => !prevEditing);

        const newNotes = notes.map((note) => {
          if (note.id === id) {
            note.post = body.data.post;
          }

          return note;
        });

        await updatesNotes(newNotes);

        alertMessage.success("Note edited successfully");
      } else {
        alertMessage.error(body.message);
      }
    } else {
      alertMessage.error("the Note can't be emty");
    }
  };

  const handleEditingText = () => {
    if (!isEditing) {
      return <label className="text-black">{noteValue}</label>;
    }

    return (
      <input
        defaultValue={noteValue}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        className="w-full py-1 px-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    );
  };
  const handleEditingButton = () => {
    if (!isEditing) {
      return (
        <button
          onClick={handleEditing}
          className="py-2 px-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          {" "}
          <FaPen />
        </button>
      );
    }

    return (
      <button
        onClick={handleUpdate}
        className="py-2 px-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
      >
        <FaSave />
      </button>
    );
  };

  return (
    <li className="mt-4 border border-gray-200 rounded-md p-2 flex justify-between items-center bg-gray-100">
      <div className="flex items-center justify-between w-full">
        {handleEditingText()}
        <div className="ml-4 flex items-center gap-2">
          {handleEditingButton()}
          <button
            onClick={handleDeleteNotes}
            className="py-2 px-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            {" "}
            <FaTrash />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Note;
