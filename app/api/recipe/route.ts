import { NextRequest, NextResponse } from 'next/server'
import { generateRecipe } from '@/lib/generateRecipe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ingredients } = body

    if (!ingredients || typeof ingredients !== 'string') {
      return NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      )
    }

    const recipe = await generateRecipe(ingredients)

    // Save to database if user is authenticated
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      try {
        await supabase.from('recipe_searches').insert({
          user_id: user.id,
          ingredients: ingredients,
          recipe: recipe,
        })
      } catch (dbError) {
        // Log but don't fail the request if DB save fails
        console.error('Error saving recipe to database:', dbError)
      }
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Error in recipe API:', error)
    return NextResponse.json(
      { error: 'Failed to generate recipe' },
      { status: 500 }
    )
  }
}
