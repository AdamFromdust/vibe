'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function MagicButtonPage() {
  const [dreamInput, setDreamInput] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Magic Button</h1>

      <div className="mb-8 text-center">
        <p className="text-lg mb-4">
          Shhh... Can you hear it? The Magic Button has amplified your connection to your deepest aspirations. Now it&apos;s your turn to speak. What&apos;s that one dream you&apos;ve secretly cherished, the one you barely dared to admit even to yourself? Whisper it to us. Paint a picture with your words. Imagine you&apos;re describing it to the universe, and the universe is listening intently, ready to conspire in your favor. No dream is too big, too bold, or too &apos;out there.&apos; Let your imagination run wild.
        </p>
      </div>

      <Textarea
        placeholder="Describe your dream here..."
        className="min-h-32 mb-4 w-full"
        value={dreamInput}
        onChange={(e) => setDreamInput(e.target.value)}
      />

      <Button className="w-full" size="lg">
        Make the magic happen
      </Button>
    </div>
  );
}
