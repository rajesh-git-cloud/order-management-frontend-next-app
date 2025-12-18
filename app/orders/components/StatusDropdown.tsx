"use client";

import React, { useEffect, useRef, useState } from "react";
import { StatusDropdownProps } from "../types";

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const filteredOptions = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        className="border rounded px-3 py-1 text-sm w-52 text-left"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0 ? selected.join(", ") : "Select status"}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-52 bg-white border rounded shadow-lg max-h-60 overflow-auto p-2">
          <input
            type="text"
            placeholder="Filter status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-2 border rounded px-2 py-1 text-sm"
          />
          {filteredOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
          {filteredOptions.length === 0 && (
            <p className="text-xs text-gray-400 px-2 py-1">No matching status</p>
          )}
        </div>
      )}
    </div>
  );
};
