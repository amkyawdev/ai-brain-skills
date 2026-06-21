import React from 'react';
import { Brain, BarChart3, TrendingUp, Clock, Star, Activity } from 'lucide-react';
import StatsCard from './components/StatsCard';
import SkillsChart from './components/SkillsChart';
import RecentActivity from './components/RecentActivity';
import TopSkills from './components/TopSkills';
import { useAnalytics } from './hooks/useAnalytics';

function App() {
  const { stats, skills, recentActivity, topSkills } = useAnalytics();

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <Brain className="logo" size={32} />
          <h1>AI Brain Skills Dashboard</h1>
        </div>
      </header>

      <main className="main-content">
        <section className="stats-grid">
          <StatsCard
            title="Total Skills"
            value={stats.totalSkills}
            icon={<Star />}
            color="blue"
          />
          <StatsCard
            title="Categories"
            value={stats.categories}
            icon={<BarChart3 />}
            color="purple"
          />
          <StatsCard
            title="Avg Priority"
            value={stats.avgPriority}
            icon={<TrendingUp />}
            color="green"
          />
          <StatsCard
            title="Active Sessions"
            value={stats.activeSessions}
            icon={<Activity />}
            color="orange"
          />
        </section>

        <section className="charts-grid">
          <div className="chart-card">
            <h3>Skills by Category</h3>
            <SkillsChart data={skills} />
          </div>
          <div className="chart-card">
            <h3>Recent Activity</h3>
            <RecentActivity activities={recentActivity} />
          </div>
        </section>

        <section className="top-skills-section">
          <h3>Top Skills</h3>
          <TopSkills skills={topSkills} />
        </section>
      </main>
    </div>
  );
}

export default App;
