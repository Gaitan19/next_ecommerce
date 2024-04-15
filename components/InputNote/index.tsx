import { useState } from "react";
import { alertMessage } from "../Alert";
import { handlePostNote } from "@/services/notes";
import { FaPaperPlane } from "react-icons/fa";

interface UpdateNote {
  (text: any): void;
}

interface notesData {
  author: string;
  created_at: string;
  id: number;
  post: string;
}

interface inputNote {
  updatesNotes: UpdateNote;
  notes: notesData[];
}

interface note {
  author?: string;
  post: string;
}

const InputNote = ({ updatesNotes, notes }: inputNote) => {
  const [newNote, setNewNote] = useState("");

  const handleChangeInput = (input: any): void => {
    setNewNote(input.target.value);
  };

  const handleSubmit = async (event: any) => {
    await event.preventDefault();

    const {
      data: { body, status },
    } = await handlePostNote(newNote);

    if (status === 200) {
      alertMessage.success("Note added successfully");

      await updatesNotes([...notes, body.data]);
      setNewNote(() => "");
    } else {
      alertMessage.error(body.message);
    }
  };

  return (
    <div className="mt-8 bg-gray-100 rounded-md p-4 shadow-md w-full">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          className="flex-grow py-2 px-4 mr-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Enter a note"
          type="text"
          value={newNote}
          onChange={handleChangeInput}
          required
        />
        <button className="py-2 px-4 rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center gap-1">
          <span className="hidden sm:block">Submit</span>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default InputNote;
