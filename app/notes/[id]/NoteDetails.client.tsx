"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  note?: Note;
}

export default function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  const id = note?.id;

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id!),
    initialData: note,
    enabled: !!id,
    refetchOnMount: false,
  });

  const noteData = data ?? note;

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !noteData) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{noteData.title}</h2>
        </div>
        <p className={css.content}>{noteData.content}</p>
        <p className={css.date}>
          {new Date(noteData.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
