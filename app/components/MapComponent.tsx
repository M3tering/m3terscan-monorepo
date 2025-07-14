"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMapStore } from "../stores/mapStore";
import * as L from "leaflet";

const defaultIcon = L.icon({
	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface MapComponentProps {
	onLocationFetched: React.Dispatch<
		React.SetStateAction<{ lat: number; lng: number; dateTime: string } | null>
	>;
	center?: { lat: number; lng: number } | null;
}

const MapComponent: React.FC<MapComponentProps> = ({
	onLocationFetched,
	center,
}) => {
	const { mapCenter, setMapCenter } = useMapStore();
	const [mapInitialized, setMapInitialized] = useState(false);
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const markerRef = useRef<L.Marker | null>(null);

	// Initialize map only once
	useEffect(() => {
		if (mapRef.current && !mapInstanceRef.current) {
			const defaultLagosCoords = {
				lat: 6.5244,
				lng: 3.3792,
			};

			// Initialize map
			mapInstanceRef.current = L.map(mapRef.current).setView(
				[defaultLagosCoords.lat, defaultLagosCoords.lng],
				15
			);

			// Add OpenStreetMap tile layer
			L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
				maxZoom: 20,
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			}).addTo(mapInstanceRef.current);

			setMapInitialized(true);
			setMapCenter(defaultLagosCoords);
			onLocationFetched({
				lat: defaultLagosCoords.lat,
				lng: defaultLagosCoords.lng,
				dateTime: new Date().toISOString(),
			});
		}
	}, [setMapCenter, onLocationFetched]);

	// Handle center changes (both from props and store)
	useEffect(() => {
		if (!mapInitialized || !mapInstanceRef.current) return;

		const targetCenter = center || mapCenter;
		if (!targetCenter) return;

		mapInstanceRef.current.setView([targetCenter.lat, targetCenter.lng], 15);

		// Remove existing marker
		if (markerRef.current) {
			mapInstanceRef.current.removeLayer(markerRef.current);
		}

		// Add new marker
		markerRef.current = L.marker([targetCenter.lat, targetCenter.lng], {
			icon: defaultIcon,
		})
			.addTo(mapInstanceRef.current)
			.bindPopup(
				`Lat: ${targetCenter.lat.toFixed(4)}, Lng: ${targetCenter.lng.toFixed(
					4
				)}`
			)
			.openPopup();
	}, [center, mapCenter, mapInitialized]);

	// Cleanup
	useEffect(() => {
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, []);

	return (
		<div
			ref={mapRef}
			style={{
				width: "100%",
				height: "400px",
			}}
		/>
	);
};

export default MapComponent;
