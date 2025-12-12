interface Recipe {
  title: string
  ingredients: string[]
  steps: string[]
  prepTime?: string
  funFact?: string
}

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{recipe.title}</h2>

        {recipe.prepTime && (
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">Prep Time:</span> {recipe.prepTime}
          </p>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Steps:</h3>
          <ol className="list-decimal list-inside space-y-3">
            {recipe.steps.map((step, index) => (
              <li key={index} className="text-gray-600 leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {recipe.funFact && (
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Fun Fact!</h3>
            <p className="text-gray-700">{recipe.funFact}</p>
          </div>
        )}
      </div>
    </div>
  )
}
