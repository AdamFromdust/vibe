# Manual Test Instructions for Task 6: Implement OpenAI Text-to-Speech Functionality

## Objective
To verify that the Text-to-Speech (TTS) functionality, using OpenAI, correctly reads the AI-generated visualization text aloud when the user interacts with the visualization display, and that related functionalities like speech cancellation and error handling work as expected.

## Prerequisites
- The application is running (`pnpm dev`).
- `OPENAI_API_KEY` environment variable is correctly set up for the backend.
- You have a modern web browser capable of playing MP3 audio via HTML5 `<audio>` element.
- Ensure your device's sound is on and audible.

## Test Cases

### Test Case 6.1: Basic OpenAI TTS Playback
1.  Navigate to the application's main page.
2.  Enter a description of a dream in the text area (e.g., "Exploring a vibrant coral reef").
3.  Click the "Weave My Dream" button.
4.  Wait for the visualization text to appear.
5.  The "Start Visualization & Speech" button should be visible.
6.  Click the "Start Visualization & Speech" button.
7.  **Expected Result:**
    *   The button text might change to "Loading audio..." briefly, then to "Stop Speech".
    *   You should hear the visualization text being read aloud by a female voice (OpenAI 'nova' voice).
    *   The speech should be clear.
    *   Open the browser's developer console. You might see logs related to audio fetching and a log like "TTS finished." when the speech completes.

### Test Case 6.2: Stopping and Restarting Speech
1.  Follow steps 1-6 from Test Case 6.1 to start TTS playback. The button should now say "Stop Speech".
2.  While the speech is playing, click the "Stop Speech" button.
3.  **Expected Result:** The speech should stop. The button text should revert to "Start Visualization & Speech".
4.  Click the "Start Visualization & Speech" button again.
5.  **Expected Result:** The speech should fetch again and start playing from the beginning.

### Test Case 6.3: Voice Quality (OpenAI 'nova')
1.  Follow steps 1-7 from Test Case 6.1.
2.  Listen to the voice.
3.  **Expected Result (Qualitative):** The voice should be a clear, female English voice, characteristic of OpenAI's 'nova' voice.

### Test Case 6.4: Cancelling Speech with "Dream Again"
1.  Follow steps 1-6 from Test Case 6.1 to start TTS playback.
2.  While the speech is playing, click the "Dream Again" button.
3.  **Expected Result:**
    *   The speech should stop immediately.
    *   The UI should return to the initial dream input screen.

### Test Case 6.5: Error Handling - API Error (Backend)
1.  Temporarily disable network access for the application or misconfigure the `OPENAI_API_KEY` (if possible in a controlled test environment) to simulate an API error.
2.  Follow steps 1-6 from Test Case 6.1.
3.  **Expected Result:**
    *   Speech should not play.
    *   An error message should be displayed to the user (e.g., "Failed to generate speech audio.", or a more specific API error).
    *   Check the browser console for error messages related to the API call failing (e.g., 4xx or 5xx status from `/api/ai/generate/speech`).
    *   The application should remain stable.

### Test Case 6.6: Browser Compatibility (Audio Playback)
1.  Repeat Test Case 6.1 in different modern browsers (e.g., Chrome, Firefox, Edge, Safari).
2.  **Expected Result:** The MP3 audio playback should work consistently across these browsers.

### Test Case 6.7: Error Handling - Audio Element Playback Error
1.  This is difficult to force reliably. It could occur if the browser has an issue with the `<audio>` element or the fetched MP3 blob is corrupted (unlikely from OpenAI but theoretically possible).
2.  **Expected Result:** The application should not crash. An error message like "Error playing speech audio." might appear. Check the browser's developer console for any media playback errors.

## Reporting Issues
- For any failed test case, note the browser version, operating system, steps to reproduce, actual result, and expected result.
- Include any relevant console logs (both client-side and server-side if API errors occur) or error messages shown in the UI. 