import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
export const JournalEntry = ({ body, date, id, title, url }) => {
  const dispatch = useDispatch();
  const noteDate = moment(date);

  const handleEntryClick = () => {
    dispatch(
      activeNote(id, {
        body,
        date,
        id,
        title,
        url,
      })
    );
  };
  return (
    <div className="journal__entry" onClick={handleEntryClick}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `URL(${url})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};
