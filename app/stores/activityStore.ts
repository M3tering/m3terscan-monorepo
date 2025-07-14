import { create } from "zustand";

export interface ActivityItem {
	time: string;
	date: string;
	energy: number;
	signature: string;
	value: number;
	validity: "Valid" | "Invalid";
	hoursAgo: number;
	displayTime: string;
}

interface ActivityState {
	activities: ActivityItem[];
	filter: string;
	setFilter: (filter: string) => void;
}

const parseTimeAgo = (date: string, time: string) => {
	try {
		const fullDateTime = new Date(`${date}T${convertTo24Hour(time)}`);
		const now = new Date();
		const diffMs = now.getTime() - fullDateTime.getTime();
		const diffMinutes = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMinutes / 60);
		const diffDays = Math.floor(diffHours / 24);

		let displayTime = "";
		if (diffMinutes < 60) {
			displayTime = `${diffMinutes} mins ago`;
		} else if (diffHours < 24) {
			displayTime = `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
		} else if (diffDays < 7) {
			displayTime = `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
		} else {
			displayTime = `${diffDays} days ago`;
		}

		return {
			hoursAgo: diffHours, // Keep numeric for filtering
			displayTime, // Formatted string for display
		};
	} catch (error) {
		console.error("Error parsing date/time:", error);
		return {
			hoursAgo: Infinity,
			displayTime: "Unknown time ago",
		};
	}
};

const convertTo24Hour = (timeStr: string): string => {
	try {
		const [time, modifier] = timeStr.split(" ");
		const [hoursStr, minutesStr] = time.split(":");
		let hours = parseInt(hoursStr, 10);
		const minutes = parseInt(minutesStr, 10);

		if (modifier === "PM" && hours !== 12) hours += 12;
		if (modifier === "AM" && hours === 12) hours = 0;

		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
			2,
			"0"
		)}:00`;
	} catch (error) {
		console.error("Error converting time:", error);
		return "00:00:00";
	}
};

const rawActivities: Omit<ActivityItem, "hoursAgo" | "displayTime">[] = [
	{
		time: "10:00 PM",
		date: "2025-07-10",
		energy: 150,
		signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
		value: 0.5,
		validity: "Invalid",
	},
	{
		time: "04:00 AM",
		date: "2025-07-10",
		energy: 150,
		signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
		value: 0.5,
		validity: "Valid",
	},
	{
		time: "12:00 AM",
		date: "2025-07-08",
		energy: 150,
		signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
		value: 0.5,
		validity: "Invalid",
	},
	{
		time: "09:15 AM",
		date: "2025-07-09",
		energy: 200,
		signature: "0x5879aB83c7f2ac174e3eFfB75d39578733E0e7f",
		value: 0.75,
		validity: "Valid",
	},
	{
		time: "02:30 PM",
		date: "2025-07-07",
		energy: 180,
		signature: "0x9123cdEF83c7f2ac174e3eFfB75d39578733E0a1",
		value: 0.6,
		validity: "Invalid",
	},
	{
		time: "07:45 AM",
		date: "2025-07-10",
		energy: 220,
		signature: "0x3456abCD83c7f2ac174e3eFfB75d39578733E0b2",
		value: 0.8,
		validity: "Valid",
	},
	{
		time: "05:20 PM",
		date: "2025-07-05",
		energy: 170,
		signature: "0x7890efGH83c7f2ac174e3eFfB75d39578733E0c3",
		value: 0.55,
		validity: "Invalid",
	},
	{
		time: "11:10 PM",
		date: "2025-07-07",
		energy: 190,
		signature: "0x1234ghIJ83c7f2ac174e3eFfB75d39578733E0d4",
		value: 0.65,
		validity: "Valid",
	},
	{
		time: "03:55 AM",
		date: "2025-07-10",
		energy: 210,
		signature: "0x5678ijKL83c7f2ac174e3eFfB75d39578733E0e5",
		value: 0.7,
		validity: "Invalid",
	},
	{
		time: "08:25 PM",
		date: "2025-07-08",
		energy: 160,
		signature: "0x9012klMN83c7f2ac174e3eFfB75d39578733E0f6",
		value: 0.5,
		validity: "Valid",
	},
	{
		time: "01:40 PM",
		date: "2025-07-09",
		energy: 230,
		signature: "0x3456mnOP83c7f2ac174e3eFfB75d39578733E0g7",
		value: 0.85,
		validity: "Invalid",
	},
	{
		time: "06:15 AM",
		date: "2025-07-06",
		energy: 140,
		signature: "0x7890opQR83c7f2ac174e3eFfB75d39578733E0h8",
		value: 0.45,
		validity: "Valid",
	},
	{
		time: "11:50 PM",
		date: "2025-06-30",
		energy: 250,
		signature: "0x1234qrST83c7f2ac174e3eFfB75d39578733E0i9",
		value: 0.9,
		validity: "Invalid",
	},
];

const sortedActivities = rawActivities.sort((a, b) => {
	const dateA = new Date(`${a.date}T${convertTo24Hour(a.time)}`);
	const dateB = new Date(`${b.date}T${convertTo24Hour(b.time)}`);
	return dateB.getTime() - dateA.getTime();
});

const activities: ActivityItem[] = sortedActivities.map((item) => {
	const { hoursAgo, displayTime } = parseTimeAgo(item.date, item.time);
	return {
		...item,
		hoursAgo,
		displayTime,
	};
});

export const useActivityStore = create<ActivityState>((set) => ({
	activities,
	filter: "All",
	setFilter: (filter) => set({ filter }),
}));
