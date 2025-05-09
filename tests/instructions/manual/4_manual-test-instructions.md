# Manual Testing Instructions for Task 4: Frontend API Integration

**Objective:** To verify that the client-side logic correctly calls the backend API when the 'Make the magic happen' button is clicked, handles responses and errors appropriately, and updates the UI accordingly.

## 1. Setup:

*   Ensure the Next.js development server is running (`pnpm dev`).
*   Ensure your `OPENAI_API_KEY` is correctly set in your `.env.local` file (this is for the backend API called by the frontend).
*   Open the application in your browser (usually `http://localhost:3000`).

## 2. Test Cases:

### TC4.1: Empty Dream Input Validation

*   **Action:** Leave the "Describe your dream here..." textarea empty and click "Make the magic happen".
*   **Expected Result:** An error message "Please describe your dream first" should appear. The button should not enter a loading state, and no API call should be made.

### TC4.2: Successful Visualization Generation (Happy Path)

*   **Action:**
    1.  Enter a dream description (e.g., "flying over mountains") into the textarea.
    2.  Click "Make the magic happen".
    3.  If prompted by the browser, allow location access.
*   **Expected Result:**
    1.  The button should change to "Creating magic..." and become disabled. The textarea should also become disabled.
    2.  After a short period, the input form should disappear, and a section titled "Your Visualization" should appear.
    3.  This section should contain the AI-generated text based on your dream and location.
    4.  A "Dream Again" button should be visible below the visualization.
    5.  No error messages should be displayed.
    6.  Check the browser's developer console (Network tab) to confirm a POST request was made to `/api/magic-button/generate-visualization` with a 200 status. Inspect the request payload to see `dreamText` and `location` (location might be "in a faraway land" if geolocation fails or is denied). Inspect the response to see the `visualizationText`.

### TC4.3: Geolocation Denied/Unavailable

*   **Action:**
    1.  If possible, configure your browser to block location access for the site or simulate geolocation failure.
    2.  Enter a dream description.
    3.  Click "Make the magic happen".
*   **Expected Result:**
    1.  The process should still complete. The `location` sent to the backend API should be "in a faraway land".
    2.  A visualization should still be generated based on the dream and this default location.
    3.  No error related to geolocation should be directly visible to the user on the page (though warnings might appear in the console from `geolocation-service.ts`).

### TC4.4: API Error Simulation (Backend Returns Error)

*   **Action (Requires code modification or network blocking for true test):**
    *   *Option A (Network Block):* Use browser developer tools to block requests to `/api/magic-button/generate-visualization` before clicking the button.
    *   *Option B (Backend Code Change - temporary):* Modify `app/api/magic-button/generate-visualization/route.ts` to temporarily force an error (e.g., return `NextResponse.json({ message: "Simulated API Error" }, { status: 500 })`). Remember to revert this change after testing.
    1.  Enter a dream description.
    2.  Click "Make the magic happen".
*   **Expected Result:**
    1.  The button should show "Creating magic..." and then revert to "Make the magic happen".
    2.  An error message like "Simulated API Error", "Failed to generate visualization", or "Sorry, the magic isn't flowing right now. Please try again." should appear.
    3.  The visualization section should not appear.

### TC4.5: API Returns No Visualization Text

*   **Action (Requires backend code modification - temporary):** Modify `app/api/magic-button/generate-visualization/route.ts` to temporarily return a success response but without the `visualizationText` field (e.g., `return NextResponse.json({ someOtherField: "test" })`). Remember to revert this.
    1. Enter a dream description.
    2. Click "Make the magic happen".
*   **Expected Result:**
    1. The button should show "Creating magic..." and then revert.
    2. An error message like "No visualization text received from API." or similar should appear.

### TC4.6: "Dream Again" Button Functionality

*   **Action:**
    1.  Successfully generate a visualization (follow TC4.2).
    2.  Click the "Dream Again" button.
*   **Expected Result:**
    1.  The visualization display should disappear.
    2.  The initial input form (textarea and "Make the magic happen" button) should reappear.
    3.  The dream textarea should be cleared (as implemented).
    4.  Any previous error messages should be cleared.

### TC4.7: Loading State and UI Responsiveness

*   **Action:** While the API call is in progress (during TC4.2 after clicking the button but before the result appears):
    1.  Try to type in the textarea.
    2.  Try to click the "Make the magic happen" button again.
*   **Expected Result:**
    1.  The textarea should be disabled; no typing should be possible.
    2.  The button should be disabled and show "Creating magic..."; clicking it again should have no effect. 