import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Interprétation des Rêves - Accueil" },
    { name: "description", content: "Entrez votre rêve et découvrez sa signification potentielle." },
  ];
};

// Action function to handle form submission
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dream = formData.get("dream") as string;

  if (!dream || dream.trim() === "") {
    return json({ error: "Veuillez entrer une description de votre rêve.", interpretation: null, dream: null }, { status: 400 });
  }

  // --- Placeholder for actual dream interpretation logic ---
  // In a real application, you would call an API or use a library here.
  // For now, we'll just return a generic message based on keywords.
  let interpretation = "L'interprétation de ce rêve est complexe et personnelle.";
  if (dream.toLowerCase().includes("voler")) {
    interpretation = "Rêver de voler symbolise souvent un désir de liberté, d'évasion ou de dépassement des obstacles.";
  } else if (dream.toLowerCase().includes("tomber")) {
    interpretation = "Rêver de tomber peut indiquer un sentiment d'insécurité, de perte de contrôle ou d'anxiété face à une situation.";
  } else if (dream.toLowerCase().includes("eau")) {
    interpretation = "L'eau dans les rêves représente fréquemment les émotions. Son état (calme, agitée) donne des indices sur votre état émotionnel.";
  } else if (dream.toLowerCase().includes("serpent")) {
    interpretation = "Le serpent est un symbole ambivalent, pouvant représenter la guérison, la transformation, mais aussi la tentation ou la peur.";
  }
  // --- End of placeholder logic ---

  return json({ error: null, interpretation, dream });
}


export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [dreamInput, setDreamInput] = useState(actionData?.dream ?? "");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
            Interpréteur de Rêves
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Décrivez votre rêve pour explorer sa signification potentielle.
          </p>
        </header>

        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="dream" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Décrivez votre rêve ici :
            </label>
            <textarea
              id="dream"
              name="dream"
              rows={6}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Ex: J'ai rêvé que je volais au-dessus de ma ville..."
              value={dreamInput}
              onChange={(e) => setDreamInput(e.target.value)}
              required
            />
          </div>

          {actionData?.error && (
            <p className="text-red-600 dark:text-red-400 text-sm">{actionData.error}</p>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isSubmitting ? "Interprétation en cours..." : "Interpréter mon rêve"}
            </button>
          </div>
        </Form>

        {actionData?.interpretation && (
          <div className="mt-10 p-6 bg-indigo-50 dark:bg-gray-700 rounded-lg border border-indigo-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Interprétation :</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{actionData.interpretation}</p>
          </div>
        )}
      </div>
       <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Note : Ceci est une interprétation symbolique et non une science exacte.</p>
      </footer>
    </div>
  );
}
