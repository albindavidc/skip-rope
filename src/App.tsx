/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { RopeGuide } from './pages/RopeGuide';
import { BuyingGuide } from './pages/BuyingGuide';
import { SkillTree } from './pages/SkillTree';
import { SkillDetail } from './pages/SkillDetail';
import { WorkoutTimer } from './pages/WorkoutTimer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/skills" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="ropes" element={<RopeGuide />} />
          <Route path="guide" element={<BuyingGuide />} />
          <Route path="skills" element={<SkillTree />} />
          <Route path="skills/:id" element={<SkillDetail />} />
          <Route path="workout" element={<WorkoutTimer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

