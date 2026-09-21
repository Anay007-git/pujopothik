"use client";

import { useState, useCallback } from "react";

export interface UserCoordinates {
  lat: number;
  lng: number;
}

export interface UseUserLocationReturn {
  userCoords: UserCoordinates | null;
  isLocating: boolean;
  locationError: string | null;
  requestLocation: () => Promise<UserCoordinates | null>;
  clearLocation: () => void;
  setUserCoordsManual: (coords: UserCoordinates) => void;
}

// Fallback: Kolkata Central (Esplanade / MG Road)
export const KOLKATA_CENTER_COORDS: UserCoordinates = {
  lat: 22.5726,
  lng: 88.3639,
};

export function useUserLocation(): UseUserLocationReturn {
  const [userCoords, setUserCoords] = useState<UserCoordinates | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = useCallback((): Promise<UserCoordinates | null> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !navigator.geolocation) {
        const err = "Geolocation is not supported by your browser.";
        setLocationError(err);
        resolve(null);
        return;
      }

      setIsLocating(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: UserCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserCoords(coords);
          setIsLocating(false);
          setLocationError(null);
          resolve(coords);
        },
        (error) => {
          setIsLocating(false);
          let errorMsg = "Unable to retrieve your location.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = "Location permission was denied. Please allow location access in your browser.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = "Location information is unavailable.";
          } else if (error.code === error.TIMEOUT) {
            errorMsg = "Location request timed out. Retrying or fallback to Kolkata center.";
          }
          setLocationError(errorMsg);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }, []);

  const clearLocation = useCallback(() => {
    setUserCoords(null);
    setLocationError(null);
  }, []);

  const setUserCoordsManual = useCallback((coords: UserCoordinates) => {
    setUserCoords(coords);
    setLocationError(null);
  }, []);

  return {
    userCoords,
    isLocating,
    locationError,
    requestLocation,
    clearLocation,
    setUserCoordsManual,
  };
}

