"use client";

import React, { useState } from "react";

type Option = { id: number; name: string };

type TeacherMultiSelectProps = {
  options: Option[];
  values: number[];
  onChange: (values: number[]) => void;
};

export default function TeacherMultiSelect({
  options,
  values,
  onChange,
}: TeacherMultiSelectProps) {
  const [filter, setFilter] = useState("");

  const toggleValue = (id: number) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label className="text-xs font-medium text-gray-500">Professores</label>

      {/* Badges de professores selecionados */}
      <div className="flex flex-wrap gap-2">
        {options
          .filter((opt) => values.includes(opt.id))
          .map((opt) => (
            <div
              key={opt.id}
              className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer select-none"
              onClick={() => toggleValue(opt.id)}
            >
              {opt.name} ×
            </div>
          ))}
      </div>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar professor..."
        className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Lista de opções filtradas */}
      <div className="border border-gray-200 rounded max-h-40 overflow-y-auto mt-1">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt) => (
            <div
              key={opt.id}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                values.includes(opt.id) ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => toggleValue(opt.id)}
            >
              {opt.name}
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-400 text-sm">Nenhum professor encontrado</div>
        )}
      </div>
    </div>
  );
}
