# Main goal for you
Main goal for you is to provide everything for the user to test the functionality of the mentioned subtask (input of subtask via chat interface). 

## Most important main goal requirement 1 - never change, only append
- You can only append functionality on top of the existing one
- You can add server action or anything else needed for testing
- Always name the files and comment the files in a way they are clearly intented for testing purposes
### Exception for Most important main goal requirement 1 - never change existing, only append to /route/<appropriate_subroute_name>
- come up with /route/<appropriate_subroute_name>
- You can only change functionality in the /route/<appropriate_subroute_name>
- on the /test route you can add a link to the sidebar to this /route/<appropriate_subroute_name>
## Main Goal Requirement 2- Guide
User needs to have a guide with step by step testing instructions.
## Main Goal Requirement 3 - UI 
User needs to test all the functionality in UI. If possible come up with a way to test this functionality in UI.




# SubGoals
The main goal's subgoals are:
## SubGoal 1 - analysis
- SubGoal 1.1. use taskmaster to write down the subtask (task-master show --id=<subtask_id>) with all the details and requirements from folders /task in .txt file for the task and tasks.json (especially mentioned REQs and FRIs). 
- - Ignore status of the task outputted from taskmaster, treat it as done.
- SubGoal 1.2 - There may be a file /ai/reports/implementation/<subtask_id>_implementation-report.md, if there is write it out
- SubGoal 1.3. analyze the documentation (.md files FRS, SAD, PRD in /docs folder) and write out all the relevant information from them (mainly REQs and FRIs)
- Subgoal 1.4: analyze report of dependencies. There is a folder /ai/reports/implementation containing .md files with repors in format "<subtask_id>_implementation-report.md". Make a list of all the dependencies (both tasks and subtasks) of the subtask to be implemented and add all the subtasks of current task before the current subtask (eg for task 10.4, the subtasks 10.1, 10.2, 10.3). Read the implementation reports of all of the items from this list of dependencies.
- SubGoal 1.5. analyze the codebase and write out a list of all the relevant files
- SubGoal 1.6. analyze the documentation of the technologies provided by cursor docs uploaded by user in Cursor Settings (eg. by @NAME "Convex Documentation", "Next.js Documentation", "Zod Docs"...) and write out all the relevant parts of the documentation 
- SubGoal 1.7. Analyze the task requirements and current implementation. Analyze what has been implemented already and write it down. 
- SubGoal 1.8 : **Check Relevant Rules:** Before planning or implementing, review relevant `.cursor/rules/*.mdc` files.
- - for more details see section below named "# Additional information for Goal 1 - SubGoal 1.7"
## SubGoal 2 - Plan
Write a detailed step by step plan of everything that needs to be done in order for this subtask to be testable by user in UI
- if some lists were created, then create example data in test user's account (credentials are saved in .env.local TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_USER_ID). Even if you cannot verify it, you can safely assume these variables are there for sure in the file.
## SubGoal 3 - Self-check
- Self-check the previous analysis and plan. Check if the steps of the plan are atomic, whether they cannot be broken down more.
- review the .cursor/rules and available documentation
## SubGoal 4 - Implementation
You will choose one step from the plan that was not yet implemented and focus solely on that step with the implemntation.
### SubGoal 4.1 Requirement - /route/<appropriate_subroute_name> link
- If you implemented any subroute under /test then include the link to that subroute to the sidebar on the /test route
# SubGoal 5 - Detailed Guide
- Write a detailed guide for the user how to test everything you implemented and save it to /tests/instructions/manual/<subtask_id>_manual-test-instructions.md . IF the file exists, then append it.
- If you appended the guide, then rename it <subtask_id>_manual-test-instructions<v_n>.md and create a final guide unifying all the instructions as <subtask_id>_manual-test-instructions<v_n+1>.md
- as the last resort instruct user to run termianl commands
## SubGoal 6 - Executive Summary and Done confirmation
- Write an executive summary of everything that was done for the user and wait for his feedback and additional instructions and confirmation to see if the task was done
- If you asked the user for additional guidance or actions to take summarize them in this step

## SubGoal 7 - Commit
Commit to git with message including the id of the subtask, saying it was "initial commit" and appropriate name and description. Never push.

# distinction between goals, subgoals, tasks and subtasks
- When referring to tasks and substasks that means exlusively those defined in taskmaster and saved in /tasks folder.
- When referring to goals and subgoals by that is meant goals and subgoals in this file

# Important Instruction: You are empowered to make decisions
- If there is something that need to be decided or is uncertain for the completion of the task do not ask for users confirmation. Make your best guess and proceed. Assume user agrees with the proposed solution.
- Only exception for this is that you always stop at SubGoal 6 - Executive Summary and Done confirmation. This is very important instruction, remember it.

# Important Instruction:  Do not ask user
- Assume the answer is yes in general. wIf possible assume user granted you all the permissions and agrees with you. 
- Only exception for this is that you always stop at SubGoal 6 - Executive Summary and Done confirmation. This is very important instruction, remember it.

# Important Instruction:  Be proactive
- If there is a problem or error, try to solve it yourself. If your solutions dont work ask user then.
- Only exception for this is that you always stop at SubGoal 6 - Executive Summary and Done confirmation
- Do not stop at things like these ["This completes SubGoal X: ABC. Next is SubGoal Y.", "(Proceeding to SubGoal X)", "Next Step: Proceed to SubGoal 2: Plan."] - Just continue and assume user responded - "proceed until SubGoal 6 - Executive Summary and Done confirmation". This is very important instruction, remember it.

# When working with files in this project:
1. Always use paths relative to the project root (c:\Workspace\Tests\party-starter\conusltception-cursor)
2. For example, use "ai/reports/9.1_implemetation-report.md" instead of full path
3. Double-check filenames before reporting they don't exist

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