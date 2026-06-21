import { useState, useEffect } from 'react';

interface AnalyticsData {
  stats: {
    totalSkills: number;
    categories: number;
    avgPriority: number;
    activeSessions: number;
  };
  skills: { name: string; value: number; color: string }[];
  recentActivity: {
    id: string;
    type: 'create' | 'update' | 'load' | 'delete';
    skill: string;
    time: string;
  }[];
  topSkills: {
    name: string;
    category: string;
    priority: number;
    uses: number;
  }[];
}

export function useAnalytics(): AnalyticsData {
  const [data, setData] = useState<AnalyticsData>({
    stats: { totalSkills: 0, categories: 0, avgPriority: 0, activeSessions: 0 },
    skills: [],
    recentActivity: [],
    topSkills: []
  });

  useEffect(() => {
    // Mock data for demonstration
    setData({
      stats: {
        totalSkills: 48,
        categories: 12,
        avgPriority: 72,
        activeSessions: 3
      },
      skills: [
        { name: '00-core', value: 4, color: '#60a5fa' },
        { name: '01-domains', value: 35, color: '#a855f7' },
        { name: '04-custom', value: 4, color: '#22c55e' }
      ],
      recentActivity: [
        { id: '1', type: 'load', skill: 'web-frontend/react', time: '2 min ago' },
        { id: '2', type: 'create', skill: 'backend/golang', time: '15 min ago' },
        { id: '3', type: 'update', skill: 'database/sql', time: '1 hour ago' },
        { id: '4', type: 'load', skill: 'devops/docker', time: '2 hours ago' },
        { id: '5', type: 'load', skill: 'backend/python/fastapi', time: '3 hours ago' }
      ],
      topSkills: [
        { name: 'react', category: '01-domains/web-frontend', priority: 90, uses: 156 },
        { name: 'fastapi', category: '01-domains/backend', priority: 88, uses: 142 },
        { name: 'docker', category: '01-domains/devops', priority: 85, uses: 128 },
        { name: 'sql', category: '01-domains/database', priority: 82, uses: 115 },
        { name: 'nextjs', category: '01-domains/web-frontend', priority: 80, uses: 98 }
      ]
    });
  }, []);

  return data;
}
