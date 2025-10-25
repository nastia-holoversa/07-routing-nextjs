"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted!");
    },
    onError: () => toast.error("Failed to delete note."),
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                  <div className={css.actions}>
                      <Link href={`/notes/${note.id}`} className={css.link}>
                          View details
                      </Link>
                      <button
                          className={css.button}
                          onClick={() => handleDelete(note.id)}
                          disabled={deleteMutation.isPending}
                      >
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                      </button>
                  </div>
              </div>
        </li>
      ))}
    </ul>
  );
}
