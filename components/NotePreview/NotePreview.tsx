"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

export default function NotePreview({ note }: { note: Note }) {
  const router = useRouter();

  return (
    <div className={css.preview}>
      <button onClick={() => router.back()} className={css.close}>
        ✕
      </button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p className={css.tag}>Tag: {note.tag}</p>
    </div>
  );
}
