import { motion } from "framer-motion";
import { useHeatmapData } from "../../../hooks/useHeatmapData";

export const ViewToggle = () => {
	const { viewMode, setViewMode } = useHeatmapData();

	const views: {
		mode: "yearly-weeks" | "yearly-days";
		label: string;
		targetView: "yearly-weeks" | "yearly-days";
	}[] = [
		{
			mode: "yearly-weeks",
			label: "Monthly",
			targetView: "yearly-weeks",
		},
		{
			mode: "yearly-days",
			label: "Yearly",
			targetView: "yearly-days",
		},
	];

	return (
		<motion.div
			className="flex justify-center"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="relative flex border border-dashed rounded-full p-1 ">
				{views.map(({ mode, label }) => {
					const isActive = viewMode === mode;
					return (
						<button
							key={mode}
							onClick={() => setViewMode(mode)}
							className={`relative z-10 px-4 py-1.5 rounded-full transition-colors text-sm font-medium`}
						>
							{isActive && (
								<motion.div
									layoutId="toggle-pill"
									className="absolute inset-0 bg-green-100 rounded-full z-[-1]"
									transition={{
										type: "spring",
										stiffness: 500,
										damping: 40,
									}}
								/>
							)}
							<span
								className={
									isActive
										? "text-[var(--color-success)]"
										: "text-[var(--text-secondary)]"
								}
							>
								{label}
							</span>
						</button>
					);
				})}
			</div>
		</motion.div>
	);
};
