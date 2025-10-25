"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle notes filter menu"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={closeMenu}
              >
                {tag === "All" ? "All notes" : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
