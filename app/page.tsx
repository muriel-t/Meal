'use client'

import { useState } from 'react'
import IngredientForm from '@/components/IngredientForm'
import RecipeCard from '@/components/RecipeCard'

interface Recipe {
  title: string
  ingredients: string[]
  steps: string[]
  prepTime?: string
  funFact?: string
}

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (ingredients: string) => {
    setIsLoading(true)
    setError(null)
    setRecipe(null)

    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate recipe')
      }

      const data = await response.json()
      setRecipe(data)
    } catch (err) {
      setError('Oops! Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
            Kid-Friendly Recipe Generator
          </h1>
          <p className="text-lg text-gray-600">
            Tell us what ingredients you have, and we'll create a fun recipe!
          </p>
        </header>

        <IngredientForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-8 max-w-2xl mx-auto bg-red-100 border-2 border-red-300 rounded-2xl p-4">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        {recipe && <RecipeCard recipe={recipe} />}

        {isLoading && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Creating your recipe...</p>
          </div>
        )}
      </div>
    </main>
  )
}
