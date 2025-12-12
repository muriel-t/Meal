import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface Recipe {
  title: string
  ingredients: string[]
  steps: string[]
  prepTime?: string
  funFact?: string
}

export async function generateRecipe(ingredientList: string): Promise<Recipe> {
  const prompt = `Create a kid-friendly recipe using these ingredients: ${ingredientList}.

Return a JSON object with this exact structure:
{
  "title": "Recipe name",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "steps": ["step 1 in simple language", "step 2 in simple language", ...],
  "prepTime": "estimated time like '30 minutes'",
  "funFact": "a fun fact about the recipe or an ingredient"
}

Make sure:
- The recipe is fun and easy for kids to understand
- Steps are written in very simple, clear language
- Include basic ingredients like salt, pepper, etc. if needed
- The fun fact is engaging and educational`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful cooking assistant that creates kid-friendly recipes. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const recipe = JSON.parse(content) as Recipe
    return recipe
  } catch (error) {
    console.error('Error generating recipe:', error)

    // Fallback recipe
    const ingredients = ingredientList.split(',').map(i => i.trim())
    return {
      title: `Simple ${ingredients[0]} Recipe`,
      ingredients: [...ingredients, 'salt', 'pepper'],
      steps: [
        'Wash your hands!',
        'Get all your ingredients ready.',
        'Mix the ingredients together in a bowl.',
        'Cook according to your favorite method.',
        'Enjoy your meal!',
      ],
      prepTime: '30 minutes',
      funFact: 'Cooking together is a great way to learn and have fun!',
    }
  }
}
