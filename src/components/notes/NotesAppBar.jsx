import moment from "moment";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const date = moment(new Date());
  const { active } = useSelector((state) => state.notes);
  const handleSaveNote = () => {
    dispatch(startSaveNote(active));
  };
  const handlePictureUpload = () => {
    console.log("botn imagen");
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>{date.format("MMM Do YY")}</span>
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Picture
        </button>
        <button onClick={handleSaveNote} className="btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
