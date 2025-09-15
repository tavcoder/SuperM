// Custom dropdown select component with keyboard navigation and accessibility features
import { useState, useRef, useEffect, memo } from "react";
import { FaChevronDown } from "react-icons/fa";

function CustomSelect({ value, onChange, options, ...restProps }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const wrapperRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
        if (!isOpen && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsOpen(true);
            return;
        }

        if (isOpen) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightIndex((prev) => (prev + 1) % options.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIndex((prev) => (prev - 1 + options.length) % options.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selectedOption = options[highlightIndex];
                onChange(selectedOption.value);
                setIsOpen(false);
            } else if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
            }
        }
    };

    const selected = options.find((opt) => opt.value === value)?.label || options[0]?.label;

    return (
        <div
            className="custom-select"
            ref={wrapperRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-activedescendant={options[highlightIndex]?.value}
            {...restProps}
        >
            <button
                className="custom-select__button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selected}
                <FaChevronDown className="custom-select__icon" />
            </button>

            {isVisible && (
                <ul
                    className={`custom-select__list ${isOpen ? "fade-in" : "fade-out"}`}
                    role="listbox"
                    ref={listRef}
                >
                    {options.map((opt, index) => (
                        <li
                            key={opt.value}
                            id={opt.value}
                            className={`custom-select__option ${opt.value === value ? "selected" : ""} ${index === highlightIndex ? "highlighted" : ""}`}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            role="option"
                            aria-selected={opt.value === value}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default memo(CustomSelect);
