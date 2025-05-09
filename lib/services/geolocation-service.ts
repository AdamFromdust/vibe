export async function getUserLocation(): Promise<string> {
    return new Promise((resolve) => {
        // Ensure this code runs only in the browser
        if (typeof window === 'undefined' || !navigator.geolocation) {
            console.warn('Geolocation API is not available.');
            resolve('in a faraway land');
            return;
        }

        let resolved = false;
        const resolutionTimeout = setTimeout(() => {
            if (!resolved) {
                resolved = true;
                console.warn('Geolocation attempt timed out (overall).');
                resolve('in a faraway land');
            }
        }, 6000); // Overall timeout for the entire operation

        const successCallback = async (position: GeolocationPosition) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(resolutionTimeout);

            try {
                const { latitude, longitude } = position.coords;
                // Using Nominatim for reverse geocoding
                // Added accept-language=en to prefer English results
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=en`
                );

                if (!response.ok) {
                    console.error('Geocoding API request failed:', response.status, await response.text());
                    resolve('in a faraway land');
                    return;
                }

                const data = await response.json();
                // Prioritize more specific location types
                const location =
                    data.address?.city ||
                    data.address?.town ||
                    data.address?.village ||
                    data.address?.county || // Added county as another fallback
                    data.address?.state ||
                    data.address?.country;

                if (location) {
                    resolve(location);
                } else {
                    console.warn('Could not extract a usable location name from geocoding data:', data.address);
                    resolve('in a faraway land');
                }
            } catch (error) {
                console.error('Error during reverse geocoding:', error);
                resolve('in a faraway land');
            }
        };

        const errorCallback = (error: GeolocationPositionError) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(resolutionTimeout);

            console.warn(`Geolocation error: ${error.message} (Code: ${error.code})`);
            resolve('in a faraway land');
        };

        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
            {
                timeout: 5000, // Timeout for the getCurrentPosition call itself
                enableHighAccuracy: false, // Can save battery, often sufficient
            }
        );
    });
} 