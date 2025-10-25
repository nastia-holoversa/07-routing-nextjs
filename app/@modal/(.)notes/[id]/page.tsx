import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewModal({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </Modal>
  );
}
