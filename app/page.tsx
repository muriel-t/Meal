'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import IngredientForm from '@/components/IngredientForm'
import RecipeCard from '@/components/RecipeCard'
import AuthForm from '@/components/AuthForm'
import PastSearches from '@/components/PastSearches'
import UserMenu from '@/components/UserMenu'
import { useAuth } from '@/contexts/AuthContext'

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
  const { user, loading: authLoading } = useAuth()
  const [showPastSearches, setShowPastSearches] = useState(false)

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

  if (authLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 flex-1">
              Kid-Friendly Recipe Generator
            </h1>
            <div className="flex-1 flex justify-end">
              {user && <UserMenu />}
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Tell us what ingredients you have, and we'll create a fun recipe!
          </p>
        </header>

        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-3xl h-56 md:h-72 lg:h-80">
            <Image
              src="/image3.png"
              alt="Cartoon cow and pig cooking together in a colorful kitchen"
              fill
              className="object-cover rounded-3xl shadow-lg"
              priority
            />
          </div>
        </div>

        {!user ? (
          <div className="mb-8">
            <AuthForm />
          </div>
        ) : (
          <>
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

            {user && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowPastSearches(!showPastSearches)}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-xl transition-colors shadow-md"
                >
                  {showPastSearches ? 'Hide' : 'Show'} Past Searches
                </button>
              </div>
            )}

            {showPastSearches && user && <PastSearches />}
          </>
        )}
      </div>
    </main>
  )
}
