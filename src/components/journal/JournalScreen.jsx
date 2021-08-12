import React from "react";
import { useSelector } from "react-redux";
import { NoteScreen } from "../notes/NoteScreen";
import NothigSelected from "./NothigSelected";

import Sidebar from "./Sidebar";

const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);
  return (
    <div className="journal__main-content">
      <Sidebar />
      <main>{active ? <NoteScreen /> : <NothigSelected />}</main>
    </div>
  );
};

export default JournalScreen;
