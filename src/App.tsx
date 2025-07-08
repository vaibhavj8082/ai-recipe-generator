import { Authenticator } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import './App.css';

const client = generateClient<Schema>();

function AppContent() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecipe('');

    try {
      const result = await client.queries.askBedrock({
        ingredients: ingredients.split(',').map((i) => i.trim()),
      });

      if (result.data?.body) {
        setRecipe(result.data.body);
      } else {
        setRecipe(result.data?.error || 'No recipe generated.');
      }
    } catch (err) {
      console.error(err);
      setRecipe('Error generating recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🍽️ AI Recipe Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g., tomato, basil, olive oil"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </form>
      {recipe && (
        <div className="recipe-output">
          <h2>Recipe</h2>
          <pre>{recipe}</pre>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Authenticator hideSignUp={false}>
      {({ signOut, user }) => (
        <>
          <header className="header">
            <p>Welcome, <strong>{user?.signInDetails?.loginId}</strong></p>
            <button onClick={signOut}>Sign out</button>
          </header>
          <AppContent />
        </>
      )}
    </Authenticator>
  );
}
