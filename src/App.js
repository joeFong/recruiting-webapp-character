import './App.css';

/* Provider */
import { CharacterProvider } from './features/characters/characterContext';

/* Common Components */
import HStack from './components/common/HStack/HStack';
import VStack from './components/common/VStack/VStack';

/* Features */
import CharacterSelection from './features/characters/components/CharacterSelection';
import CharacterSheet from './features/characters';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Joe Fong</h1>
      </header>
      <section className="App-section">
        <CharacterProvider>
          <HStack>
            <VStack>
                {/* Section for Character Selection */}
                <CharacterSelection/>
            </VStack>
          </HStack>

          <HStack>
            <CharacterSheet/>
          </HStack>
        </CharacterProvider>
      </section>
    </div>
  );
}

export default App;
