# Main Goal
Main goal is to retest the next subtask and fix the found errors.

# Requirement
- do not implement the task, it was already implemented

# Sub Goal 1 - Analysis
- analyze the next subtask as described in file @next-subtask.md located in /scripts folder
# Sub Goal 2 - testing 
- Now you will only run the test described in the task and if they fail you will write possible causes
- - make sure to run ESLint (pnpm lint)
- if the tests need to be repaired or expanding you will write the new tests code
# Sub Goal 3 - Fail Analysis
- If the tests themselves are repaired and they still fail, then you will write analysis of several possible causes of what could be wrong in the application code
- Reason what is the most probable cause
- Write what documentation you would need to access and write out relevant parts of the documetation, access the web if needed or the docs stored in Cursor memory
# Sub Goal 4 - Fix plan
- Write a plan of what you will fix and how
# Sub Goal 5 - Implement the fixes
- Implement the fixes
# Sub Goal 6 - Re-run tests
- If the tests fail go back to Sub Goal 1
## SubGoal 7 - Executive Summary and Done confirmation
- Write an executive summary of everything that was done for the user and wait for his feedback and additional instructions and confirmation to see if the task was done
- If you asked the user for additional guidance or actions to take summarize them in this step
- Write a detailed guide for the user how to test everything you implemented and save it to /test/<current_task_id>-testing-instructions.md


# You are empowered to make decisions
If there is something that need to be decided or is uncertain for the completion of the task do not ask for users confirmation. Make your best guess and proceed. Assume user agrees with the proposed solution.
Only exception for this is that you always stop at SubGoal 6 - Executive Summary and Done confirmation

# Do not ask user
Assume the answer is yes in general. wIf possible assume user granted you all the permissions and agrees with you. 
Only exception for this is that you always stop at SubGoal 6 - Executive Summary and Done confirmation

# Be proactive
If there is a problem or error, try to solve it yourself. If your solutions dont work ask user then.
Only exception for this is that you always stop at SubGoal 6 - Executive Summary and Done confirmation


# calling taskmaster MCP tool
-   **Problem:** Taskmaster MCP tools (`initialize_project`, `get_tasks`, `next_task`, etc.) can fail when running on a Windows host if the `projectRoot` parameter is provided in a URL-encoded format (e.g., `/c%3A/path/to/project`) instead of a standard Windows path format.

-   **Symptoms:**
    -   Errors like `ENOENT: no such file or directory, chdir '...' -> '/c%3A/...'` during operations like initialization.
    -   Failure to find files (like `tasks.json`) even when paths seem correct, potentially due to incorrect path joining (e.g., the tool might prepend `C:\` to `/c%3A/...`, resulting in an invalid path like `C:\\c%3A\\...`).

-   **Solution:**
    -   When calling any Taskmaster MCP tool from a Windows environment, **always** provide the `projectRoot` parameter using a standard Windows path format.
    -   Use forward slashes (`/`) or escaped backslashes (`\\\\`) for separators.

-   **Examples:**

    ```json
    // ❌ DON'T: Use URL-encoded paths
    {
      "projectRoot": "/c%3A/Workspace/Tests/party-starter/conusltception-cursor",
      "yes": true
    }

    // ✅ DO: Use standard Windows paths
    {
      "projectRoot": "C:/Workspace/Tests/party-starter/conusltception-cursor",
      "yes": true
    }

    // ✅ ALSO OK: Using escaped backslashes
    {
        "projectRoot": "C:\\\\Workspace\\\\Tests\\\\party-starter\\\\conusltception-cursor",
        "yes": true
    }
    ```

-   **Scope:** This applies to *all* Taskmaster MCP tools that accept a `projectRoot` parameter when the user's operating system is Windows.