import type {
	BlockData,
	HourlyEnergyUsage,
	StablecoinData,
	DayData,
} from "../types";
// import { globalStablecoinData } from "../constants";

export const generateHourlyEnergyUsage = (
	blocks: BlockData[]
): HourlyEnergyUsage[] => {
	const uniqueMeterIds = Array.from(
		new Set(blocks.map((block) => block.meterId))
	);
	const energyData: HourlyEnergyUsage[] = [];

	// Define 24-hour formatted hours from 00:00 to 23:00
	const fixedHours = Array.from(
		{ length: 24 },
		(_, i) => `${i.toString().padStart(2, "0")}:00`
	);

	uniqueMeterIds.forEach((meterId) => {
		const meterBlocks = blocks.filter((block) => block.meterId === meterId);
		const activityLevel = meterBlocks.length / blocks.length;
		const baseUsage = 10 + activityLevel * 20;

		const date = meterBlocks[0]?.date || "2025-01-01"; // Fallback date

		fixedHours.forEach((hour) => {
			const variation = 0.7 + Math.random() * 0.6;
			const energyUsed = parseFloat((baseUsage * variation).toFixed(1));
			energyData.push({
				meterId,
				hour,
				energyUsed,
				timestamp: `${date} ${hour}`,
			});
		});
	});

	return energyData;
};

export const generateMeterStablecoins = (
	blocks: BlockData[],
	stablecoins: StablecoinData[]
): Record<string, StablecoinData[]> => {
	const uniqueMeterIds = Array.from(
		new Set(blocks.map((block) => block.meterId))
	);
	const meterStablecoins: Record<string, StablecoinData[]> = {};

	uniqueMeterIds.forEach((meterId) => {
		const meterBlocks = blocks.filter((block) => block.meterId === meterId);
		const activityLevel = meterBlocks.length / blocks.length;

		// Generate all stablecoins for each meter with USD values
		meterStablecoins[meterId] = stablecoins.map((coin) => {
			const value = 200 + Math.random() * 450 * activityLevel;

			return {
				symbol: coin.symbol,
				network: coin.network,
				value: parseFloat(value.toFixed(4)),
			};
		});
	});

	return meterStablecoins;
};

export const generateMockHeatmapData = (
	blocks: BlockData[],
	meterId?: string
): DayData[] => {
	const data: DayData[] = [];
	const filteredBlocks = meterId
		? blocks.filter((block) => block.meterId === meterId)
		: blocks;

	// Generate data for the last 90 days
	for (let i = 0; i < 90; i++) {
		const date = new Date();
		date.setDate(date.getDate() - i);

		// Find blocks for this day
		const dayBlocks = filteredBlocks.filter((block) => {
			const blockDate = new Date(block.date.split("/").reverse().join("-"));
			return (
				blockDate.getDate() === date.getDate() &&
				blockDate.getMonth() === date.getMonth() &&
				blockDate.getFullYear() === date.getFullYear()
			);
		});

		const activityLevel = dayBlocks.length / 10; // Normalize to 0-1 range

		// For each block found, create a DayData entry with its meterId
		dayBlocks.forEach((block) => {
			data.push({
				date: date.toISOString().split("T")[0],
				value: Math.floor(activityLevel * 100),
				month: date.getMonth(),
				day: date.getDate(),
				weekday: date.getDay(),
				week: Math.ceil(date.getDate() / 7),
				meterId: block.meterId, // Add meterId here
			});
		});

		if (dayBlocks.length === 0 && !meterId) {
			// For "all meters" view, we can use a dummy meterId or leave it empty
			data.push({
				date: date.toISOString().split("T")[0],
				value: 0,
				month: date.getMonth(),
				day: date.getDate(),
				weekday: date.getDay(),
				week: Math.ceil(date.getDate() / 7),
				meterId: "", // Or use a default value
			});
		}
	}

	return data;
};

export const generateMockHeatmapDataByYear = (
	blocks: BlockData[],
	year: number,
	meterId?: string
): DayData[] => {
	const data: DayData[] = [];
	const filteredBlocks = meterId
		? blocks.filter((block) => block.meterId === meterId)
		: blocks;

	// Generate data for the entire year
	const startDate = new Date(year, 0, 1);
	const endDate = new Date(year, 11, 31);

	for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
		const date = new Date(d);

		// Find blocks for this day
		const dayBlocks = filteredBlocks.filter((block) => {
			const blockDate = new Date(block.date.split("/").reverse().join("-"));
			return (
				blockDate.getDate() === date.getDate() &&
				blockDate.getMonth() === date.getMonth() &&
				blockDate.getFullYear() === date.getFullYear()
			);
		});

		// Create more realistic activity values
		let activityValue = 0;

		if (dayBlocks.length > 0) {
			// If we have actual blocks for this day, use them
			activityValue = Math.min(dayBlocks.length * 25, 100);
		} else {
			// Generate some random activity for days without blocks to make the heatmap more interesting
			// Create patterns: weekdays have more activity, weekends less
			const dayOfWeek = date.getDay();
			const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
			const baseActivity = isWeekend ? 0.1 : 0.3;

			// Add some seasonal variation
			const month = date.getMonth();
			const seasonalMultiplier = 1 + 0.3 * Math.sin((month / 11) * Math.PI);

			// Add some randomness
			const randomFactor = 0.5 + Math.random() * 0.5;

			activityValue = Math.floor(
				baseActivity * seasonalMultiplier * randomFactor * 100
			);
		}

		// Create entries for each meter or a general entry
		if (meterId) {
			// For specific meter, create one entry
			data.push({
				date: date.toISOString().split("T")[0],
				month: date.getMonth(),
				day: date.getDate(),
				weekday: date.getDay(),
				week: Math.ceil(date.getDate() / 7),
				meterId: meterId,
				value: activityValue,
			});
		} else {
			// For all meters view, create entries for each unique meter
			const uniqueMeterIds = Array.from(
				new Set(filteredBlocks.map((block) => block.meterId))
			);

			if (uniqueMeterIds.length > 0) {
				uniqueMeterIds.forEach((meterId) => {
					data.push({
						date: date.toISOString().split("T")[0],
						month: date.getMonth(),
						day: date.getDate(),
						weekday: date.getDay(),
						week: Math.ceil(date.getDate() / 7),
						meterId: meterId,
						value: activityValue,
					});
				});
			} else {
				// Fallback for when no meters are available
				data.push({
					date: date.toISOString().split("T")[0],
					month: date.getMonth(),
					day: date.getDate(),
					weekday: date.getDay(),
					week: Math.ceil(date.getDate() / 7),
					meterId: "",
					value: activityValue,
				});
			}
		}
	}

	return data;
};
