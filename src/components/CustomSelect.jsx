import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const OPTIONS = [
    { label: "Select an option", value: "" },
    { label: "Price (high to low)", value: "price-desc" },
    { label: "Price (low to high)", value: "price-asc" },
    { label: "Name (A to Z)", value: "name-asc" },
    { label: "Name (Z to A)", value: "name-desc" },
];

export default function CustomSelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // for DOM rendering
    const [highlightIndex, setHighlightIndex] = useState(0);
    const wrapperRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200); // wait for fade-out
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
                setHighlightIndex((prev) => (prev + 1) % OPTIONS.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIndex((prev) => (prev - 1 + OPTIONS.length) % OPTIONS.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selectedOption = OPTIONS[highlightIndex];
                onChange(selectedOption.value);
                setIsOpen(false);
            } else if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
            }
        }
    };

    const selected = OPTIONS.find((opt) => opt.value === value)?.label || OPTIONS[0].label;

    return (
        <div
            className="custom-select"
            ref={wrapperRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-activedescendant={OPTIONS[highlightIndex]?.value}
        >
            <button
                className="custom-select__button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Select order option"
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
                    {OPTIONS.map((opt, index) => (
                        <li
                            key={opt.value}
                            id={opt.value}
                            className={`custom-select__option ${opt.value === value ? "selected" : ""
                                } ${index === highlightIndex ? "highlighted" : ""}`}
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
