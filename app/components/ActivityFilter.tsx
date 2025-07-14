import { motion, AnimatePresence } from "framer-motion";
import { useActivityStore } from "../stores/activityStore";
import { useRef, useState } from "react";
import { FaSliders } from "react-icons/fa6";
import useClickOutside from "../hooks/useClickOutside";
import { CheckIcon } from "lucide-react";

const filterOptions = [
	{ label: "8hrs", value: "8hrs" },
	{ label: "24hrs", value: "24hrs" },
	{ label: "3days", value: "3days" },
	{ label: "7days", value: "7days" },
	{ label: "All", value: "All" },
];

export const ActivityFilter = () => {
	const { filter, setFilter } = useActivityStore();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useClickOutside(dropdownRef, () => setIsOpen(false));

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 p-2 rounded-lg  transition-colors"
			>
				<FaSliders className=" hover:text-[var(--icon-color)] transition-colors cursor-pointer" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 p-[2px] mt-2 w-32 bg-[var(--background-primary)] rounded-lg shadow-lg z-10 border-[2px] border-[var(--background-secondary)]"
					>
						{filterOptions.map((option) => (
							<button
								key={option.value}
								onClick={() => {
									setFilter(option.value);
									setIsOpen(false);
								}}
								className={`w-full text-left px-4 py-2 text-sm rounded-lg flex justify-between hover:bg-[var(--background-secondary)] ${
									filter === option.value ? "text-[var(--icon-color)]" : ""
								}`}
							>
								{option.label}
								{filter === option.value && (
									<CheckIcon className="inline ml-2 h-4 w-4 text-[var(--icon-color)]" />
								)}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};