import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function fetchNotes(params?: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", { params });
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await axiosInstance.post<Note>("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axiosInstance.get<Note>(`/notes/${id}`);
  return response.data;
}
export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchTags(): Promise<NoteTag[]> {
  const response = await axiosInstance.get<{ notes: Note[] }>("/notes");
  const tags = Array.from(new Set(response.data.notes.map((note) => note.tag)));
  return tags;
}
