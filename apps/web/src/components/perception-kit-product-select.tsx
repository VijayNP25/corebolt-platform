"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

interface PerceptionKitProductSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

/**
 * Single-select, type-to-search combobox used only by the Perception Kit
 * quote modal (perception-kit-contact-modal.tsx). Supports finding a product
 * either by typing (fuzzy filtered via cmdk) or by scrolling the open list.
 * Intentionally kept separate from the shared MultiSelect used elsewhere so
 * changes here never affect other contact forms.
 */
export function PerceptionKitProductSelect({
  options,
  value,
  onChange,
  placeholder = "Select a product",
  id,
}: PerceptionKitProductSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <Command className="pk-select overflow-visible bg-transparent">
      <div className="pk-select__control">
        <CommandPrimitive.Input
          id={id}
          ref={inputRef}
          value={open ? inputValue : selectedLabel ?? ""}
          onValueChange={(next) => {
            setInputValue(next);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            setInputValue("");
            setOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => setOpen(false), 150);
          }}
          placeholder={placeholder}
          className="pk-select__input"
        />
        <ChevronDown className="pk-select__chevron" aria-hidden="true" />
      </div>
      {open && (
        <div className="pk-select__popover">
          <CommandGroup className="pk-select__list">
            {options.length === 0 && (
              <p className="pk-select__empty">No matches found</p>
            )}
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onSelect={() => {
                  onChange(option.value);
                  setInputValue("");
                  setOpen(false);
                  inputRef.current?.blur();
                }}
                className="pk-select__item"
                data-selected-item={option.value === value ? "true" : "false"}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </div>
      )}
    </Command>
  );
}
