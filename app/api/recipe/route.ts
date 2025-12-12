import { NextRequest, NextResponse } from 'next/server'
import { generateRecipe } from '@/lib/generateRecipe'

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

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Error in recipe API:', error)
    return NextResponse.json(
      { error: 'Failed to generate recipe' },
      { status: 500 }
    )
  }
}
