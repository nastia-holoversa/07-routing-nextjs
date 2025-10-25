export default function NotesFilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <section style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <aside style={{ width: "250px" }}>{sidebar}</aside>
      <div style={{ flex: 1 }}>{children}</div>
    </section>
  );
}
