'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getUserLocation } from '@/lib/services/geolocation-service';
import VisualizationDisplay from '@/components/magic-button/visualization-display';

export default function MagicButtonPage() {
  const [dreamInput, setDreamInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visualizationText, setVisualizationText] = useState('');
  const [error, setError] = useState('');
  const [showVisualization, setShowVisualization] = useState(false);

  const handleMagicButtonClick = async () => {
    if (!dreamInput.trim()) {
      setError('Please describe your dream first');
      return;
    }

    setError('');
    setIsLoading(true);
    setVisualizationText(''); // Clear previous visualization
    setShowVisualization(false); // Hide previous visualization

    try {
      // Get user location
      const location = await getUserLocation();

      // Call the backend API
      const response = await fetch('/api/magic-button/generate-visualization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dreamText: dreamInput,
          location,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to generate visualization and could not parse error response.' }));
        throw new Error(errorData.message || 'Failed to generate visualization');
      }

      const data = await response.json();
      if (data.visualizationText) {
        setVisualizationText(data.visualizationText);
        setShowVisualization(true);
      } else {
        throw new Error('No visualization text received from API.');
      }
    } catch (err) {
      console.error('Error in handleMagicButtonClick:', err);
      if (err instanceof Error) {
        setError(err.message || 'Sorry, the magic isn\'t flowing right now. Please try again.');
      } else {
        setError('An unknown error occurred. Please try again.');
      }
      setShowVisualization(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartVisualization = () => {
    console.log('Start visualization button clicked. TTS to be implemented in Task 6.');
    // Actual TTS logic will be part of Task 6
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl flex flex-col items-center min-h-screen">
      {!showVisualization ? (
        <div className="w-full max-w-lg flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 text-center tracking-tight text-gray-900 dark:text-gray-50">Dream Weaver</h1>

          <div className="mb-8 text-center text-gray-600 dark:text-gray-400">
            <p className="text-lg leading-relaxed">
              Shhh... Can you hear it? The Dream Weaver has amplified your connection to your deepest aspirations. Now it&apos;s your turn to speak. What&apos;s that one dream you&apos;ve secretly cherished, the one you barely dared to admit even to yourself? Whisper it to us. Paint a picture with your words. Imagine you&apos;re describing it to the universe, and the universe is listening intently, ready to conspire in your favor. No dream is too big, too bold, or too &apos;out there.&apos; Let your imagination run wild.
            </p>
          </div>

          <Textarea
            placeholder="Describe your dream here... e.g., soaring over snowy mountains under a starry sky"
            className="min-h-36 mb-6 w-full p-4 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-50"
            value={dreamInput}
            onChange={(e) => setDreamInput(e.target.value)}
            disabled={isLoading}
            rows={5}
          />

          {error && <p className="text-red-500 dark:text-red-400 mb-4 text-center py-2 px-4 bg-red-50 dark:bg-red-900/30 rounded-md">{error}</p>}

          <Button
            className="w-full px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            size="lg"
            onClick={handleMagicButtonClick}
            disabled={isLoading}
          >
            {isLoading ? 'Weaving your dream...' : 'Weave My Dream'}
          </Button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <VisualizationDisplay
            visualizationText={visualizationText}
            onStartVisualization={handleStartVisualization}
          />
          <Button
            className="w-full max-w-xs mt-8 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
            size="lg"
            variant="outline"
            onClick={() => {
              setShowVisualization(false);
              setDreamInput('');
              setError('');
              setVisualizationText('');
            }}
          >
            Dream Again
          </Button>
        </div>
      )}
    </div>
  );
}
