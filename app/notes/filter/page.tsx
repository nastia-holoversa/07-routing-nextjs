import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

export default async function NotesFilterIndexPage() {
  const queryClient = new QueryClient();
  const queryParams = { page: 1, perPage: 12 };

  const data = await fetchNotes(queryParams);
  queryClient.setQueryData(["notes", queryParams], data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}