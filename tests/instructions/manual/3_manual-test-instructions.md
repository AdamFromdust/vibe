### Manual Testing Guide for API Route: `/api/magic-button/generate-visualization` (Task 3)

**Objective:** Manually verify the functionality of the backend API endpoint for generating visualizations.

**Prerequisites:**
1.  The Next.js development server should be running (e.g., via `pnpm dev`).
2.  The `OPENAI_API_KEY` environment variable must be correctly set in your `.env` file for the Next.js server.
3.  A tool capable of sending HTTP POST requests (e.g., Postman, Insomnia, `curl`, or a simple frontend test page).

**Endpoint URL:** `http://localhost:3000/api/magic-button/generate-visualization` (Assuming default Next.js port)

**HTTP Method:** `POST`

**Headers:**
*   `Content-Type: application/json`

**Test Cases:**

1.  **Test Case: Successful Visualization Generation (with Location)**
    *   **Request Body (JSON):**
        ```json
        {
          "dreamText": "I wish to become a successful writer and publish a bestselling novel.",
          "location": "my cozy study room"
        }
        ```
    *   **Expected Response Status:** `200 OK`
    *   **Expected Response Body (JSON structure):**
        ```json
        {
          "visualizationText": "<AI-generated visualization text based on the dream and location>"
        }
        ```
    *   **Verification:** Check that the `visualizationText` is present, non-empty, and seems relevant to the input.

2.  **Test Case: Successful Visualization Generation (without Location - Fallback)**
    *   **Request Body (JSON):**
        ```json
        {
          "dreamText": "I want to find inner peace and tranquility."
        }
        ```
    *   **Expected Response Status:** `200 OK`
    *   **Expected Response Body (JSON structure):**
        ```json
        {
          "visualizationText": "<AI-generated visualization text, with location as 'in a faraway land'>"
        }
        ```
    *   **Verification:** Check that `visualizationText` is present and relevant.

3.  **Test Case: Missing `dreamText`**
    *   **Request Body (JSON):**
        ```json
        {
          "location": "the mountains"
        }
        ```
    *   **Expected Response Status:** `400 Bad Request`
    *   **Expected Response Body (JSON structure):**
        ```json
        {
          "error": "Dream text is required and must be a non-empty string."
        }
        ```

4.  **Test Case: Empty `dreamText`**
    *   **Request Body (JSON):**
        ```json
        {
          "dreamText": "   ",
          "location": "the beach"
        }
        ```
    *   **Expected Response Status:** `400 Bad Request`
    *   **Expected Response Body (JSON structure):**
        ```json
        {
          "error": "Dream text is required and must be a non-empty string."
        }
        ```

5.  **Test Case: Invalid JSON in Request Body**
    *   **Request Body (Raw Text - not valid JSON):**
        `This is not JSON`
    *   **Expected Response Status:** `400 Bad Request`
    *   **Expected Response Body (JSON structure):**
        ```json
        {
          "error": "Invalid request format. Please check your input."
        }
        ```

6.  **Test Case: (Optional) Test with `OPENAI_API_KEY` temporarily removed or invalid**
    *   **Action:** Temporarily rename or remove `OPENAI_API_KEY` from your `.env` file and restart the Next.js server.
    *   **Request Body (JSON - valid input from Test Case 1):
        ```json
        {
          "dreamText": "I wish to become a successful writer and publish a bestselling novel.",
          "location": "my cozy study room"
        }
        ```
    *   **Expected Response Status:** `500 Internal Server Error`
    *   **Expected Response Body (JSON structure):**
        ```json
        {
          "error": "Server configuration error. Unable to connect to visualization service."
        }
        ```
    *   **Cleanup:** Restore the `OPENAI_API_KEY` in your `.env` file and restart the server.

**Verification Steps for Each Test Case:**
1.  Send the POST request to the endpoint with the specified headers and body.
2.  Observe the HTTP status code of the response.
3.  Inspect the JSON body of the response.
4.  Compare the actual status code and response body with the expected values.
5.  For successful cases, assess the quality and relevance of the `visualizationText` (this is subjective but should generally make sense).
6.  Check the Next.js server console logs for any unexpected errors or for the expected error/warning messages (e.g., missing API key, OpenAI error details). 