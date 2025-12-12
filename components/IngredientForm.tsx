'use client'

import { useState } from 'react'

interface IngredientFormProps {
  onSubmit: (ingredients: string) => void
  isLoading: boolean
}

export default function IngredientForm({ onSubmit, isLoading }: IngredientFormProps) {
  const [ingredients, setIngredients] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.trim()) {
      onSubmit(ingredients)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <label htmlFor="ingredients" className="block text-lg font-semibold text-gray-700 mb-3">
          What ingredients do you have?
        </label>
        <input
          id="ingredients"
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas (e.g., eggs, flour, milk)"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-gray-700 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !ingredients.trim()}
          className="mt-4 w-full bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Recipe...' : 'Generate Recipe'}
        </button>
      </div>
    </form>
  )
}
