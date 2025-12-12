
# claude.md


## Project Overview
You are Claude Code. Your job is to help generate, modify, and maintain the codebase for a small web application deployed on Vercel.


The application goal:
- User enters ingredients.
- Backend returns a kid-friendly recipe.
- UI design must follow the two provided reference images.


---


## Tech Stack
- **Frontend:** Next.js 14 (App Router), React, TailwindCSS.
- **Backend:** Next.js API route.
- **Deployment:** Vercel.
- **Repo:** GitHub.


---


## Directory Structure
```
root/
app/
page.tsx
api/
recipe/route.ts
components/
IngredientForm.tsx
RecipeCard.tsx
lib/
generateRecipe.ts
public/
(assets from design)
styles/
globals.css
package.json
tailwind.config.js
```


---


## Requirements & Behaviors


### AI Recipe Generation
- Use the OpenAI API (Chat Completions or Responses API) to generate the recipe.
- The API key will come from an environment variable: `process.env.OPENAI_API_KEY`.
- The backend route `/api/recipe` will call OpenAI with the provided ingredients.
- Prompt should return:
- Title
- Ingredients list
- Steps written in very simple, kid-friendly language
- Optional fun fact or tip
### Ingredient Input
- A single field where users list ingredients (comma-separated).
- Submit button that calls `/api/recipe`.


### Recipe Generation (via OpenAI)
- Backend calls OpenAI with the ingredient list.
- The model (e.g., `gpt-4.1-mini` or similar) returns structured JSON.
- Fallback logic available if the API call fails.
- Use a simple algorithm in `lib/generateRecipe.ts` (for now) that returns:
- Title
- Ingredients (normalized list)
- Steps (simple kid-friendly wording)
- Estimated Prep Time


### UI Requirements
- Follow visual layout from reference images:
- Light blue color palette
- Rounded cards
- Friendly font
- Clean spacing


### Components
- `IngredientForm.tsx`: input + button.
- `RecipeCard.tsx`: display recipe results.


---


## Claude Code Instructions
Whenever Claude Code is invoked, do the following:
1. Generate or update code following Next.js best practices.
2. Keep components simple and maintainable.
3. Follow Tailwind classes for layout.
4. Never invent external libraries unless instructed.
5. Validate TypeScript types.
6. Always output the full file when asked.


---
## End