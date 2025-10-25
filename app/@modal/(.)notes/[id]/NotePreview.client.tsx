"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";
import css from "./NotePreviewModal.module.css";

interface NotePreviewClientProps {
  note?: Note;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const params = useParams();
  const router = useRouter();

  const idParam = params?.id;
  const id = Array.isArray(idParam)
    ? idParam[0]
    : idParam
    ? String(idParam)
    : "";

  const { data: fetchedNote, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !note && !!id,
    retry: false,
    refetchOnMount: false,
  });

  const currentNote = note || fetchedNote;

  const handleClose = () => router.back();

  if (!id && !note) return null;

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {isLoading && !currentNote && <p>Loading note...</p>}
        {isError && <p>Note not found 😔</p>}
        {currentNote && <NotePreview note={currentNote} />}
        <button onClick={handleClose} className={css.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}
