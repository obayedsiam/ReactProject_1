import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({ options, selected, onChange, label = "Select Genre(s)" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    onChange(newSelected);
  };

  const removeTag = (id) => {
    onChange(selected.filter((item) => item !== id));
  };

  return (
    <div className="w-full" ref={wrapperRef}>
      <label className="block text-sm font-medium mb-1">{label}</label>

      {/* Selected Tags */}
      <div
        className="min-h-[42px] border rounded-md p-2 flex flex-wrap gap-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected.length === 0 && (
          <span className="text-gray-400 text-sm">Click to select</span>
        )}

        {selected.map((id) => {
          const genre = options.find((opt) => opt.id === id);
          return (
            <span
              key={id}
              className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full flex items-center"
            >
              {genre?.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(id);
                }}
                className="ml-2 text-xs hover:text-red-500"
              >
                ✕
              </button>
            </span>
          );
        })}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="border mt-1 rounded-md shadow bg-white max-h-60 overflow-y-auto absolute z-10 w-full">
          {options.map((genre) => (
            <div
              key={genre.id}
              onClick={() => toggleOption(genre.id)}
              className={`px-3 py-2 hover:bg-blue-100 cursor-pointer ${
                selected.includes(genre.id) ? "bg-blue-50 font-semibold" : ""
              }`}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
