import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDelete } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const activeId = useRef(note.id);
  // const activeUrl = useRef(note.url);
  const { body, title } = formValues;
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
    /*if (note.url !== activeUrl) {
      reset(note);
      activeUrl.current = note.url;
    }*/
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [dispatch, formValues]);

  const handleDelete = () => {
    dispatch(startDelete(note.id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Title"
          className="notes__title-input"
          autoComplete="off"
          onChange={handleInputChange}
          value={title}
          name="title"
        />
        <textarea
          className="notes-textarea"
          placeholder="Qué hay para tu día?"
          cols="30"
          rows="10"
          onChange={handleInputChange}
          value={body}
          name="body"
        ></textarea>
        {note.url && (
          <div className="notes__images">
            <img src={note.url} alt="paisaje" />
          </div>
        )}
      </div>
      <button onClick={handleDelete} className="btn btn-danger">
        Borrar
      </button>
    </div>
  );
};
