# Manual Testing Instructions for Task 5: Implement Visualization Display

**Objective:** To verify that the UI components for displaying the AI-generated visualization text, the static "Additional instructions" text, and the "Start visualization" button are correctly implemented and displayed after a successful API response.

## 1. Setup:

*   Ensure the Next.js development server is running (`pnpm dev`).
*   Open the application in your browser (usually `http://localhost:3000`).
*   Ensure you can successfully trigger the visualization generation (as per Task 4 testing - e.g., by having a valid `OPENAI_API_KEY` if the API call is live, or by mocking a successful API response if working locally without hitting the actual API).

## 2. Test Cases:

### TC5.1: Successful Visualization Display

*   **Action:**
    1.  Enter a dream description (e.g., "a serene beach at sunset") into the textarea.
    2.  Click the "Weave My Dream" (or "Make the magic happen") button.
    3.  Wait for the API response and for the UI to update.
*   **Expected Result:**
    1.  The input form should disappear.
    2.  The `VisualizationDisplay` component should appear, showing:
        *   A main heading like "Your Personalized Visualization".
        *   The AI-generated text (e.g., based on "a serene beach at sunset") clearly displayed.
        *   A section with the heading "Ready to begin?".
        *   The static "Additional instructions" paragraph text: "And know this: there is a gentle current waiting... let the journey begin."
        *   A "Start visualization" button.
    3.  The styling should be clear, readable, and focused. The text should be well-formatted (e.g., `whitespace-pre-line` for the visualization text).
    4.  No error messages should be displayed from the API call part of the flow.

### TC5.2: "Start visualization" Button Interaction

*   **Action:**
    1.  Successfully display a visualization as per TC5.1.
    2.  Open your browser's developer console.
    3.  Click the "Start visualization" button.
*   **Expected Result:**
    1.  A message should be logged to the console, similar to: "Start visualization button clicked. TTS to be implemented in Task 6."
    2.  The UI should not change significantly (actual TTS playback is for Task 6).

### TC5.3: Styling and Layout Responsiveness

*   **Action:**
    1.  Successfully display a visualization as per TC5.1.
    2.  Resize your browser window to various widths (desktop, tablet, mobile).
*   **Expected Result:**
    1.  The `VisualizationDisplay` component, including the visualization text, additional instructions, and button, should adapt gracefully to different screen sizes.
    2.  Text should remain readable, and the button should be accessible and correctly proportioned.
    3.  No elements should overlap awkwardly or become unreadable.

### TC5.4: "Dream Again" Button Functionality (Verifying Return from Visualization)

*   **Action:**
    1.  Successfully display a visualization as per TC5.1.
    2.  Click the "Dream Again" button (which is part of `app/page.tsx` but interacts with the state that shows/hides the `VisualizationDisplay`).
*   **Expected Result:**
    1.  The `VisualizationDisplay` component should disappear.
    2.  The initial input form (textarea and "Weave My Dream" button) should reappear.
    3.  The dream textarea should be cleared.
    4.  Any previous visualization text should be cleared from the state and not re-appear if the form is submitted again without new API data.

### TC5.5: Accessibility Check (Basic)

*   **Action:**
    1.  Successfully display a visualization as per TC5.1.
    2.  Use browser developer tools (e.g., Lighthouse accessibility audit, or manual inspection) to perform a basic accessibility check on the displayed content.
*   **Expected Result:**
    1.  Text should have sufficient contrast.
    2.  Headings should be used appropriately.
    3.  The button should be focusable and have an accessible name.
    4.  The visualization text itself should be programmatically readable (e.g., not just an image of text).

## Notes:
*   The actual Text-to-Speech (TTS) functionality for the "Start visualization" button is out of scope for this task (Task 5) and will be implemented and tested in Task 6.
*   These tests assume that the API integration (Task 4) is functioning correctly to provide the `visualizationText` to the `MagicButtonPage` component. 