# Manual Test Instructions for Task 6: Implement Text-to-Speech Functionality

## Objective
To verify that the Text-to-Speech (TTS) functionality correctly reads the AI-generated visualization text aloud when the user clicks the "Start visualization" button, and that related functionalities like voice selection, speech cancellation, and error handling work as expected.

## Prerequisites
- The application is running (`pnpm dev`).
- You have a modern web browser that supports the Web Speech API (e.g., Chrome, Edge, Firefox, Safari).
- Ensure your device's sound is on and audible.

## Test Cases

### Test Case 6.1: Basic TTS Playback
1.  Navigate to the application's main page.
2.  Enter a description of a dream in the text area (e.g., "Flying over a neon city at night").
3.  Click the "Weave My Dream" button.
4.  Wait for the visualization text to appear.
5.  **Expected Result (Initial):** The visualization text is displayed, along with "Additional Instructions" and a "Start visualization" button.
6.  Click the "Start visualization" button.
7.  **Expected Result (TTS):**
    *   You should hear the visualization text being read aloud.
    *   The speech should be relatively clear and at a slightly slower pace for comprehension.
    *   Open the browser's developer console. You should see a log like "TTS finished." when the speech completes.

### Test Case 6.2: Restarting Speech
1.  Follow steps 1-6 from Test Case 6.1 to start TTS playback.
2.  While the speech is playing, click the "Start visualization" button again.
3.  **Expected Result:** Any ongoing speech should stop, and the visualization text should start playing again from the beginning.

### Test Case 6.3: Voice Selection (Qualitative Check)
1.  Follow steps 1-7 from Test Case 6.1.
2.  Listen to the voice.
3.  **Expected Result (Qualitative):**
    *   The voice should ideally sound like a female English voice if one is available on your system and browser.
    *   If not, it should be a standard English voice.
    *   The speech should be intelligible.
    *   *(Note: Specific voice can vary greatly depending on the user's OS, browser, and installed voice packs. This test is more about general functionality than a specific voice timbre).* 
    *   Check the console for any warnings like "No suitable English voice found..." or "No voices loaded..." if you suspect issues.

### Test Case 6.4: Cancelling Speech with "Dream Again"
1.  Follow steps 1-6 from Test Case 6.1 to start TTS playback.
2.  While the speech is playing, click the "Dream Again" button.
3.  **Expected Result:**
    *   The speech should stop immediately.
    *   The UI should return to the initial dream input screen.

### Test Case 6.5: Error Handling - No Visualization Text (Graceful Silence)
1.  This scenario is hard to trigger directly through normal UI flow as the button only appears with text.
2.  However, if for some reason `visualizationText` was empty when `handleStartVisualization` is called:
3.  **Expected Result:** No speech should attempt to play. Check the browser console for a warning like "No visualization text to speak.". No errors should break the application.

### Test Case 6.6: Browser Compatibility (If multiple browsers available)
1.  Repeat Test Case 6.1 in different supported browsers (e.g., Chrome, Firefox, Edge).
2.  **Expected Result:** The TTS functionality should work consistently across browsers that support the Web Speech API. Note any significant differences in voice quality or availability.

### Test Case 6.7: Error Handling - TTS Utterance Error (Console Check)
1.  This is difficult to force, but if an error occurs during speech synthesis itself (e.g., a browser-specific issue with a voice or the speech engine crashes internally):
2.  **Expected Result:** The application should not crash. Check the browser's developer console for error messages like "TTS Utterance Error: ..." or "TTS error during playback: ...".

## Reporting Issues
- For any failed test case, note the browser version, operating system, steps to reproduce, actual result, and expected result.
- Include any relevant console logs or error messages. 