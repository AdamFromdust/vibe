# Manual Testing Instructions for Task 2: Geolocation Service

**Objective:** To verify the `getUserLocation` service in `lib/services/geolocation-service.ts` functions correctly under various conditions.

**Prerequisites:**
- A modern web browser with developer tools (e.g., Chrome, Firefox).
- The application running locally (`pnpm dev`).

**Test Setup:**
To test this function, you'll need to call it from a browser environment, for example, within a simple test page or directly in the browser's developer console after importing it into a component used by the application.

Example (temporary integration into `app/page.tsx` for testing):

```tsx
// In app/page.tsx or any client component
'use client';

import { useEffect, useState } from 'react';
import { getUserLocation } from '@/lib/services/geolocation-service'; // Adjust path if necessary

export default function MagicButtonPage() {
  const [location, setLocation] = useState<string>('Fetching location...');

  useEffect(() => {
    async function fetchLocation() {
      const loc = await getUserLocation();
      setLocation(loc);
      console.log('Resolved location:', loc);
    }
    fetchLocation();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Geolocation Test</h1>
      <p className="text-xl">Detected Location: {location}</p>
      {/* ... rest of your page components ... */}
    </main>
  );
}
```

**Test Cases:**

1.  **Test Case: Permissions Granted & Successful Geolocation + Geocoding**
    *   **Action:** 
        1. Open the application in your browser.
        2. When prompted by the browser to allow location access, click "Allow".
        3. Observe the console logs and the displayed location on your test page.
    *   **Expected Result:** 
        *   The function should resolve to a string representing your current city/town/country (e.g., "London", "San Francisco").
        *   Console should show the resolved location.

2.  **Test Case: Permissions Denied**
    *   **Action:**
        1. Open the application.
        2. When prompted for location access, click "Block" or "Deny".
        3. (Alternatively, if already granted, go to browser settings for the site and change location permission to "Block" then refresh the page).
        4. Observe the console logs and displayed location.
    *   **Expected Result:**
        *   The function should resolve to "in a faraway land".
        *   Console should log a warning like "Geolocation error: User denied Geolocation" and the resolved location.

3.  **Test Case: Geolocation API Timeout (Simulated)**
    *   **Action:** This is harder to simulate directly without network throttling tools. However, the internal 5-second timeout for `getCurrentPosition` and the 6-second overall timeout in `getUserLocation` are designed to handle this.
        *   You can *try* to simulate by using browser developer tools to throttle your network to "Slow 3G" and quickly refreshing the page. This might trigger the timeout.
        *   Focus on observing the console for timeout warnings.
    *   **Expected Result (if timeout occurs):**
        *   The function should resolve to "in a faraway land".
        *   Console should log a warning like "Geolocation error: Timeout expired" or "Geolocation attempt timed out (overall)."

4.  **Test Case: Geocoding API Failure (Simulated)**
    *   **Action:** 
        1.  Temporarily modify the `fetch` URL in `geolocation-service.ts` to an invalid endpoint (e.g., change `openstreetmap.org` to `openstreetmap.invalid`).
        2.  Re-run with permissions granted.
        3.  Observe console and displayed location.
        4.  **Important:** Revert the change after testing.
    *   **Expected Result:**
        *   The function should resolve to "in a faraway land".
        *   Console should log an error like "Geocoding API request failed..." or "Error during reverse geocoding:".

5.  **Test Case: Geocoding Returns No Usable Address**
    *   **Action:** This is difficult to simulate precisely. It would occur if Nominatim returns a valid response but without fields like `city`, `town`, `village`, `county`, `state`, or `country` in `data.address` (e.g., for a location in the middle of the ocean).
    *   **Expected Result (if this scenario occurs):**
        *   The function should resolve to "in a faraway land".
        *   Console might log "Could not extract a usable location name from geocoding data:".

6.  **Test Case: Geolocation API Not Available (Simulated)**
    *   **Action:**
        1. Open browser developer tools console.
        2. Temporarily override `navigator.geolocation`: `navigator.__defineGetter__('geolocation', function(){ return undefined; });` (or set it to `null`).
        3. Refresh the page where `getUserLocation` is called.
        4. Observe console logs and displayed location.
        5. **Important:** Refresh the page again *without* this override to restore normal functionality for other tests.
    *   **Expected Result:**
        *   The function should resolve to "in a faraway land".
        *   Console should log "Geolocation API is not available.".

**General Observations:**
- Check the browser's developer console for any errors or warnings logged by the `getUserLocation` function in all scenarios.
- Verify that the fallback string "in a faraway land" is used consistently when actual location data cannot be obtained. 