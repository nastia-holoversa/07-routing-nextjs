import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesFilterPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0];

  const queryClient = new QueryClient();

  const allowedTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const isNoteTag = (value: unknown): value is NoteTag =>
    typeof value === "string" && allowedTags.includes(value as NoteTag);

  const queryParams =
    tag && tag.toLowerCase() !== "all" && isNoteTag(tag)
      ? { tag, page: 1, perPage: 12 }
      : { page: 1, perPage: 12 };

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", queryParams],
      queryFn: () => fetchNotes(queryParams),
    });
    console.log("Prefetch success");
  } catch (error) {
    console.error("Prefetch error:", error);
  }

  const validTag = tag && tag.toLowerCase() !== "all" && isNoteTag(tag) ? tag : undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={validTag} />
    </HydrationBoundary>
  );
}
