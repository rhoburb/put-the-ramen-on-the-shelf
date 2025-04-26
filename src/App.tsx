import React, { useEffect, useRef, useState } from 'react';
import { createGame } from './game/Game';
import { Soup, CheckCircle2, HelpCircle } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';

interface Achievement {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

function App() {
  const gameRef = useRef<any>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'drop', title: '???', description: 'Drop the ramen on the floor', completed: false },
    { id: 'throw_right', title: '???', description: 'Throw the ramen across the room', completed: false },
    { id: 'catch', title: '???', description: 'Catch the noodles', completed: false },
    { id: 'shelf_success', title: '???', description: 'Put the ramen on the shelf', completed: false },
    { id: 'shelf_almost', title: '???', description: 'Almost, but not quite right', completed: false },
    { id: 'drink', title: '???', description: 'Throw the noodles over your shoulder', completed: false },
  ]);

  const achievementTitles = {
    'drop': 'Floor Seasoning',
    'throw_right': 'Food Fight!',
    'catch': 'Ramen Juggler',
    'shelf_success': 'Master Chef',
    'shelf_almost': 'Apprentice Chef',
    'drink': 'Order Up!',
  };

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = createGame((id: string) => {
        setAchievements(prev => 
          prev.map(achievement => 
            achievement.id === id 
              ? { ...achievement, title: achievementTitles[id as keyof typeof achievementTitles], completed: true }
              : achievement
          )
        );
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <div className="mb-8 flex items-center gap-3">
        <Soup className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold text-white">Put the Ramen on the Shelf</h1>
      </div>
      
      <div id="game-container" className="rounded-lg overflow-hidden shadow-2xl"></div>
      
      <div className="mt-8 flex gap-8 max-w-4xl w-full justify-center">
        <div className="bg-gray-800 p-6 rounded-lg text-white">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-400 mb-2">Shoulder</h3>
              <p>Q / W - Rotate left/right</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-400 mb-2">Forearm</h3>
              <p>O / P - Rotate left/right</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-400 mb-2">Wrist</h3>
              <p>G / H - Rotate left/right</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-400 mb-2">Ramen</h3>
              <p>R or N - Get new bowl</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-white">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <ul className="space-y-3">
            {achievements.map((achievement) => (
              <li key={achievement.id} className="flex items-start gap-2">
                {achievement.completed ? (
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0" />
                ) : (
                  <HelpCircle className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" />
                )}
                <div>
                  <p className="text-white font-medium">{achievement.title}</p>
                  {achievement.completed && achievement.description && (
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;