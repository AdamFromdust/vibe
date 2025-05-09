### Test Instructions for API Route: `/api/magic-button/generate-visualization` (Task 3)

**Objective:** Verify the functionality, input validation, error handling, and OpenAI integration of the visualization generation API endpoint.

**Test Environment Setup:**
- Use a testing framework like Jest or Vitest.
- Mock the `openai` module, specifically the `openai.chat.completions.create` method.
- Mock `NextResponse` if necessary for verifying responses.
- Manage `process.env.OPENAI_API_KEY` for specific test cases (e.g., testing the missing key scenario).

**Test Cases:**

1.  **Happy Path - Valid Request with Dream Text and Location:**
    *   **Given:** A POST request with a valid JSON body: `{ "dreamText": "I want to fly", "location": "Paris" }`.
    *   **And:** `process.env.OPENAI_API_KEY` is set.
    *   **And:** `openai.chat.completions.create` is mocked to return a successful response (e.g., `{ choices: [{ message: { content: "You are flying over Paris..." } }] }`).
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 200 OK status.
    *   **And:** The response body should be JSON: `{ "visualizationText": "You are flying over Paris..." }`.
    *   **And:** `openai.chat.completions.create` should have been called once with:
        *   `model: 'gpt-4.1-mini'`
        *   `messages` containing the correctly constructed KIP-inspired prompt incorporating "I want to fly" and "Paris".
        *   `temperature: 0.7`
        *   `max_tokens: 1000`

2.  **Happy Path - Valid Request with Dream Text Only (Location Fallback):**
    *   **Given:** A POST request with `{ "dreamText": "Peaceful meditation" }`.
    *   **And:** `process.env.OPENAI_API_KEY` is set.
    *   **And:** `openai.chat.completions.create` is mocked for success.
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 200 OK status.
    *   **And:** The response body should contain the mocked `visualizationText`.
    *   **And:** `openai.chat.completions.create` should have been called with the prompt including "in a faraway land" as the location.

3.  **Error Case - Missing `dreamText`:**
    *   **Given:** A POST request with `{ "location": "London" }` or `{}` or `{ "dreamText": "" }` or `{ "dreamText": null }`.
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 400 Bad Request status.
    *   **And:** The response body should be JSON: `{ "error": "Dream text is required and must be a non-empty string." }`.

4.  **Error Case - Invalid `dreamText` Type:**
    *   **Given:** A POST request with `{ "dreamText": 123 }`.
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 400 Bad Request status.
    *   **And:** The response body should be JSON: `{ "error": "Dream text is required and must be a non-empty string." }` (or a more specific type error if parsing fails earlier, though current implementation handles it as missing/empty string).

5.  **Error Case - Malformed JSON Request Body:**
    *   **Given:** A POST request with a body that is not valid JSON (e.g., `"not json"`).
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 400 Bad Request status.
    *   **And:** The response body should be JSON: `{ "error": "Invalid request format. Please check your input." }`.

6.  **Error Case - OpenAI API Call Fails:**
    *   **Given:** A valid request body.
    *   **And:** `process.env.OPENAI_API_KEY` is set.
    *   **And:** `openai.chat.completions.create` is mocked to throw an error (e.g., simulating a network issue or an error response from OpenAI like `{ response: { status: 503, data: { error: 'Service unavailable' } } }`).
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 500 Internal Server Error status.
    *   **And:** The response body should be JSON: `{ "error": "Failed to generate visualization. Please try again." }`.
    *   **And:** `console.error` should have been called with details of the OpenAI API error.

7.  **Error Case - OpenAI API Returns No Content:**
    *   **Given:** A valid request body.
    *   **And:** `process.env.OPENAI_API_KEY` is set.
    *   **And:** `openai.chat.completions.create` is mocked to return `{ choices: [{ message: { content: null } }] }` or `{ choices: [] }` or `{ choices: [{ message: {} }] }`.
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 500 Internal Server Error status.
    *   **And:** The response body should be JSON: `{ "error": "Failed to generate visualization content from AI service." }`.
    *   **And:** `console.warn` should have been called.

8.  **Error Case - Missing `OPENAI_API_KEY` Environment Variable:**
    *   **Given:** A valid request body.
    *   **And:** `process.env.OPENAI_API_KEY` is *not* set (or is an empty string).
    *   **When:** The API endpoint is called.
    *   **Then:** It should return a 500 Internal Server Error status.
    *   **And:** The response body should be JSON: `{ "error": "Server configuration error. Unable to connect to visualization service." }`.
    *   **And:** `console.error` should have been called regarding the missing API key.

**General Checks for All Tests:**
- Ensure appropriate `Content-Type: application/json` headers are on responses.
- Verify that no sensitive information (like API keys or detailed internal errors) is leaked in error responses to the client. 