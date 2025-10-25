import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={tag === "All" ? "/notes/filter" : `/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}


