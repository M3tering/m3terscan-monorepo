import { useBlockStore } from "../stores/blockStore";
import { useCallback } from "react";

export const useHeatmapData = () => {
	const {
		fetchHeatmapData,
		heatmapViewMode,
		setHeatmapViewMode,
		heatmapSelectedYear,
		heatmapSelectedMonth,
		setHeatmapYear,
		setHeatmapMonth,
		heatmapData,
		isLoading,
		generateHeatmapData,
		selectedMeterId,
	} = useBlockStore();

	const refreshHeatmapData = useCallback(() => {
		fetchHeatmapData(selectedMeterId || undefined);
	}, [fetchHeatmapData, selectedMeterId]);

	// Filter heatmapData by selectedMeterId if set
	// const filteredData = selectedMeterId
	// 	? heatmapData.filter((item) => item.meterId === selectedMeterId)
	// 	: heatmapData;

	return {
		refreshHeatmapData,
		data: heatmapData,
		viewMode: heatmapViewMode,
		setViewMode: setHeatmapViewMode,
		selectedYear: heatmapSelectedYear,
		selectedMonth: heatmapSelectedMonth,
		setYear: setHeatmapYear,
		setSelectedMonth: setHeatmapMonth,
		generateData: generateHeatmapData,
		isLoading,
		selectedMeterId,
	};
};
