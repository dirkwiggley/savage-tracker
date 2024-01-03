import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AttribPanel from './Components/Attributes/AttribPanel';
import DerivedStatsPanel from "./Components/DerivedStats/DerivedStatsPanel";
import TokenPanel from "./Components/Tokens/TokenPanel";
import SkillsPanel from './Components/Skills/SkillsPanel';
import ActionPanel from './Components/Actions/ActionsPanel';
import GearPanel from './Components/Gear/GearPanel';
import { AppContextProvider } from "./Components/AppContextProvider";
import Header from "./Components/Header";
import EffectsPanel from "./Components/Effects/EffectsPanel";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<AttribPanel />} />
          <Route path="/calc_panel" element={<DerivedStatsPanel />} />
          <Route path="/token_panel" element={<TokenPanel />} />
          <Route path="/skills_panel" element={<SkillsPanel />} />
          <Route path="/action_panel" element={<ActionPanel />} />
          <Route path="/effects_panel" element={<EffectsPanel />} />
          <Route path="/gear_panel" element={<GearPanel />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
