import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes/`).get();
  const notes = [];
  notesSnap.forEach((item) => {
    notes.push({
      id: item.id, //<- obtenemos el id del documento.
      ...item.data(), //<- obtenemos el resto de la nota (title, date y body)
    });
  });
  return await notes;
};
