"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

interface MultiSelectProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            onChange(selected.slice(0, -1));
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, onChange]
  );

  const selectables = options.filter(
    (option) => !selected.includes(option.value)
  );

  const isLight =
    className?.includes("bg-white") ||
    className?.includes("bg-gray") ||
    !className?.includes("bg-");

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className}`}
    >
      <div
        className={`group border px-4 py-3 text-sm rounded-md transition focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:border-primary ${
          isLight
            ? "bg-white text-gray-900 border-gray-300"
            : "bg-[#171b25] text-white"
        }`}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((selectedItem) => {
            const option = options.find((opt) => opt.value === selectedItem);
            return (
              <Badge
                key={selectedItem}
                variant="secondary"
                className={`rounded-sm px-1 font-normal ${
                  isLight
                    ? "bg-gray-200 text-gray-900"
                    : "bg-gray-600 text-white"
                }`}
              >
                {option?.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(selectedItem);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(selectedItem)}
                >
                  <X
                    className={`h-3 w-3 ${
                      isLight
                        ? "text-gray-500 hover:text-gray-900"
                        : "text-gray-400 hover:text-white"
                    }`}
                  />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => {
              // Delay to allow click events to fire
              setTimeout(() => setOpen(false), 200);
            }}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : undefined}
            className={`ml-2 bg-transparent outline-none flex-1 ${
              isLight
                ? "placeholder:text-gray-400 text-gray-900"
                : "placeholder:text-gray-500 text-white"
            }`}
          />
        </div>
      </div>
      {open && selectables.length > 0 && (
        <div className={`relative mt-2 z-50`}>
          <div
            className={`absolute w-full rounded-md border border-gray-300 shadow-lg outline-none animate-in max-h-48 overflow-hidden ${
              isLight ? "bg-white text-gray-900" : "bg-[#171b25] text-white"
            }`}
          >
            <CommandGroup
              className={`max-h-48 overflow-y-auto ${
                isLight ? "text-gray-900" : "text-white"
              }`}
            >
              {selectables.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      onChange([...selected, option.value]);
                      setOpen(false);
                    }}
                    style={
                      isLight ? { color: "#111827" } : { color: "#ffffff" }
                    }
                    className={`cursor-pointer px-2 py-1.5 ${
                      isLight
                        ? "hover:bg-gray-100 text-gray-900 data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900 [&]:text-gray-900"
                        : "hover:bg-gray-700 text-white data-[selected=true]:bg-gray-700 data-[selected=true]:text-white [&]:text-white"
                    }`}
                  >
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        </div>
      )}
    </Command>
  );
}
