"use client";

import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";

import css from "./Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const queryParams = useMemo(() => {
  const baseParams = {
    page: currentPage,
    perPage: PER_PAGE,
    search: debouncedSearch,
  };
  return tag ? { ...baseParams, tag } : baseParams;
}, [tag, currentPage, debouncedSearch]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: () => queryClient.getQueryData(["notes", queryParams]),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  
  const notes: Note[] = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError) {
    const message = error instanceof Error ? error.message : "Failed to load notes.";
    return <p>{message}</p>;
  }

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />

      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          + Create note
        </button>
      </header>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p className={css.empty}>No notes found ✨</p>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}