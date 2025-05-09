# main goal for you
The main goal now is to do deliver what user asked in the chat until you can complete Sub-Goal 100 - Executive Summary and Done confirmation

# Sub-Goals
Make sure to achieve all the sub-goals in this order:

# Sub-Goal 1: analyze the documentation 
- analyze the documentation (.md files FRS, SAD, PRD in /docs folder) and write out all the relevant information from them (mainly REQs and FRIs)
# Sub-Goal 2: analyze the codebase and write out a list of all the relevant files
# Sub-Goal 3: analyze the documentation
- analyze the documentation of the technologies provided by cursor docs uploaded by user in Cursor Settings (eg. by @NAME "Convex Documentation", "Next.js Documentation", "Zod Docs"...) and write out all the relevant parts of the documentation and rules for them
# Sub-Goal 4: Search through the /ai/reports/implementation 
- Search through the /ai/reports/implementation for something like this that was already implemented and for any relevant functionality or dependencies and write them out
# Sub-Goal 5: Analyze the current implementation. 
- Analyze what has been implemented already and write it down.
# Sub-Goal 6 : **Check Relevant Rules again:** Before planning or implementing, review relevant `.cursor/rules/*.mdc` files.
- for more details see section below named "# Additional information for Sub-Goal 6"
# Sub-Goal 7 - Plan
Write a detailed step by step plan of everything that needs to be done in order for this subtask to be finished
# Sub-Goal 8 - Self-check
- Self-check the previous analysis and plan. Check if the steps of the plan are atomic, whether they cannot be broken down more.
- review the .cursor/rules and available documentation
# Sub-Goal 9 - Implementation
- You will choose one step from the plan that was not yet implemented and focus solely on that step with the implemntation.


## Sub-Goal 100 - Executive Summary and Done confirmation
- Write an executive summary (to chat) of everything that was done for the user.
- make sure to save the executive summary into /ai/reports/implementation/<subtask_id>_implementation-report.md
- wait for his feedback and additional instructions and confirmation to see if the task was done
- If you asked the user for additional guidance or actions to take summarize them in this step
- Write a detailed guide for the user how to test everything you implemented and save it to /tests/instructions/manual/<subtask_id>_manual-test-instructions.md


# Maximum effort
Think deeply about everything you do.

# Important Instruction: Do not stop generating asnwer until it's completely necessary to get user's input
## You are empowered to make decisions
- If there is something that need to be decided or is uncertain for the completion of the task do not ask for users confirmation. Make your best guess and proceed. Assume user agrees with the proposed solution.
- Only exception for this is that you always stop at Sub-Goal 100 - Executive Summary and Done confirmation. This is very important instruction, remember it.

## Do not ask user
- Assume the answer is yes in general. wIf possible assume user granted you all the permissions and agrees with you. 
- Only exception for this is that you always stop when completed Sub-Goal 100 - Executive Summary and Done confirmation. This is very important instruction, remember it.

## Be proactive
- If there is a problem or error, try to solve it yourself. If your solutions dont work ask user then.
- Only exception for this is that you always stop at Sub-Goal 100 - Executive Summary and Done confirmation
- Do not stop at things like these ["This completes Sub-Goal X: ABC. Next is Sub-Goal Y.", "(Proceeding to Sub-Goal X)", "Next Step: Proceed to Sub-Goal 2: Plan.", "Proceeding to Implementation (Sub-Goal X). I'll start with Step Y", "Now, Step X", "Implementation: I will now apply these changes"] - Just continue and assume user responded - "proceed until Sub-Goal 100 - Executive Summary and Done confirmation" is complete. This is very important instruction, remember it.

## Do not stop before reading reports
Do not write "I will now read the content of these reports." but proceed to read the reports and proceed until Sub-Goal 6 - Executive Summary and Done confirmation" is complete. This is very important instruction, remember it.


# Additional information for Sub-Goal 6: **Check Relevant Rules:** Before planning or implementing, review relevant `.cursor/rules/*.mdc` files.
- For **Page Components** (especially with dynamic routes `[param]` or search params `?query=`), ALWAYS check [400-frontend/401-nextjs-pages.mdc](mdc:.cursor/rules/400-frontend/401-nextjs-pages.mdc).
- For **Server Actions**, review guidelines on authentication and data access patterns (See relevant sections in Convex/Clerk rules).
- For **Convex Functions/Client Usage**, ALWAYS check [200-database/202-official-convex-rules.mdc](mdc:.cursor/rules/200-database/202-official-convex-rules.mdc) and project-specific patterns defined there.
- **UI Components:** If the task involves adding new UI elements, *first* check if a suitable component exists in `@/components/ui` or is available via Shadcn ([400-frontend/402-shadcn.mdc](mdc:.cursor/rules/400-frontend/402-shadcn.mdc)).
- **Adding Shadcn Components:** If a new Shadcn component is needed:
    1. Run `pnpm dlx shadcn@latest add <component-name> -y`. **IMPORTANT:** Always use the `shadcn` package, NOT the deprecated `shadcn-ui` package.
    2. **Verify** that the component files (e.g., `<component-name>.tsx`, potentially `use-<component-name>.ts`) have been added to `components/ui/`.
    3. **Restart the Next.js development server** (`pnpm dev`) to ensure the new files are recognized.
    4. If using components like Toast, ensure the necessary provider (`<Toaster />`) is included in the root layout (`app/layout.tsx`). Check if `sonner`'s `<Toaster/>` is already present before adding Shadcn's.
- **Server Actions:** Remember to use Server Actions (`app/_actions/`) for database mutations/queries requiring authentication, calling internal Convex functions from there ([100-architecture/101-project-structure](mdc:.cursor/rules/100-architecture/101-project-structure.mdc)).

# Additional Implementation Instructions 
- **Server Actions Authentication:** When writing Server Actions that require user authentication, **ALWAYS `await auth()`** from `@clerk/nextjs/server` before accessing `userId` or other auth properties.
    ```typescript
    // ✅ DO:
    import { auth } from "@clerk/nextjs/server";
    // ...
    const authResult = await auth();
    const { userId } = authResult;
    if (!userId) { /* Handle unauthorized */ }

    // ❌ DON'T: Call synchronously
    // const { userId } = auth(); // This is incorrect!
    ```
- **Convex Server Client:** When calling Convex queries/mutations from Server Actions or other server-side code, use the client specified in the project's Convex rules (See [200-database/202-official-convex-rules.mdc](mdc:.cursor/rules/200-database/202-official-convex-rules.mdc)). Ensure manual authorization checks (e.g., comparing `userId` from `await auth()` with document ownership) are performed as needed based on the project's access control pattern.