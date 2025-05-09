'use client';

import { Button } from "@/components/ui/button";

interface VisualizationDisplayProps {
    visualizationText: string;
    onStartVisualization: () => void;
}

const VisualizationDisplay = ({ visualizationText, onStartVisualization }: VisualizationDisplayProps) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 dark:text-gray-50">Your Personalized Visualization</h2>

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                <p className="whitespace-pre-line text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">{visualizationText}</p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-50">Ready to begin?</h3>
                <p className="mb-6 text-md md:text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
                    And know this: there is a gentle current waiting, a soft breeze ready to transport you to a place where all you&apos;ve just whispered is wonderfully, beautifully true. It&apos;s a realm woven from your own desires. When you feel that quiet readiness stirring within, simply close your eyes. Allow yourself to drift, to be carried away by the visualization instructions that will soon unfold, like a secret map revealing itself.
                    Press the button below when your heart says &amp;apos;now,&amp;apos; and let the journey begin.
                </p>

                <div className="flex justify-center">
                    <Button
                        className="w-full max-w-xs px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        size="lg"
                        onClick={onStartVisualization}
                        variant="default" // Or try "secondary", "ghost" etc. if "default" isn&apos;t defined or you prefer another style
                    >
                        Start visualization
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VisualizationDisplay;