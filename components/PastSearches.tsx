'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import RecipeCard from './RecipeCard'

interface RecipeSearch {
  id: string
  ingredients: string
  recipe: {
    title: string
    ingredients: string[]
    steps: string[]
    prepTime?: string
    funFact?: string
  }
  created_at: string
}

export default function PastSearches() {
  const [searches, setSearches] = useState<RecipeSearch[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  const loadSearches = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('recipe_searches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setSearches(data || [])
    } catch (error) {
      console.error('Error loading searches:', error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    loadSearches()
  }, [loadSearches])

  if (loading) {
    return (
      <div className="mt-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Loading your past searches...</p>
      </div>
    )
  }

  if (searches.length === 0) {
    return (
      <div className="mt-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-gray-600">No past searches yet. Generate a recipe to see it here!</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Your Past Recipe Searches
      </h2>
      <div className="space-y-6">
        {searches.map((search) => (
          <div key={search.id} className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              <strong>Ingredients:</strong> {search.ingredients} •{' '}
              {new Date(search.created_at).toLocaleDateString()}
            </div>
            <RecipeCard recipe={search.recipe} />
          </div>
        ))}
      </div>
    </div>
  )
}

