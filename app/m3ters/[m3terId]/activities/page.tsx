"use client";

import { useActivityStore } from "../../../stores/activityStore";
import { formatAddress } from "../../../utils/formatAddress";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityFilter } from "../../../components/ActivityFilter";

const convertFilterToHours = (label: string): number => {
	const match = label.match(/(\d+)(hrs|days)/);
	if (!match) return Infinity;
	const value = parseInt(match[1]);
	return match[2] === "days" ? value * 24 : value;
};

const Activity = () => {
	const { activities, filter } = useActivityStore();
	const maxHours = convertFilterToHours(filter);

	const filtered = activities.filter((a) => a.hoursAgo <= maxHours);

	if (activities.length === 0) {
		return <p className="text-center py-4">No recent activity.</p>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className=" md:p-4 pb-10"
		>
			<div className="flex items-center justify-between mb-4">
				<motion.h3
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					Activity
				</motion.h3>

				<ActivityFilter />
			</div>

			<div
				className="overflow-x-auto"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					scrollBehavior: "smooth",
				}}
			>
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="bg-[var(--background-secondary)] text-[var(--icon-color)]">
							<th className="p-4 ">Time</th>
							<th className="p-4 ">Energy</th>
							<th className="p-4 ">Signature</th>
							<th className="p-4 ">Value</th>
							<th className="p-4 ">Status</th>
						</tr>
					</thead>
					<tbody>
						<AnimatePresence>
							{filtered.map((item, index) => (
								<motion.tr
									key={index}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
									className="even:bg-[var(--background-primary)]"
								>
									<td className="py-4 px-4">
										<span>{item.time}</span>
									</td>
									<td className="py-4 px-4">
										<span>{item.energy}</span>
									</td>
									<td className="p-4">
										<span className="block md:hidden">
											{formatAddress(item.signature)}
										</span>
										<span className="hidden md:block">{item.signature}</span>
									</td>
									<td className="py-4 px-4">
										<span>{item.value}</span>
									</td>
									<td
										className={`py-4 px-4 font-medium ${
											item.validity === "Valid"
												? "text-[var(--color-success)]"
												: "text-[var(--color-invalid)]"
										}`}
									>
										<span>{item.validity}</span>
									</td>
								</motion.tr>
							))}
						</AnimatePresence>
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default Activity;
