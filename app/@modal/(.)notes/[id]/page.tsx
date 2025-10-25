import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";
import { notFound } from "next/navigation";
import axios from "axios";
import type { Note } from "@/types/note";

type Props = {
  params: Promise<{ id?: string }>;
};

export default async function NotePreviewModal({ params }: Props) {
  const { id } = await params;

  if (!id || id === "filter") {
    console.log("⏭️ Skipping modal render — invalid ID:", id);
    return null;
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn(`Note with id=${id} not found`);
      notFound();
    }
    throw error;
  }

  const note = queryClient.getQueryData<Note>(["note", id]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient note={note} />
    </HydrationBoundary>
  );
}

