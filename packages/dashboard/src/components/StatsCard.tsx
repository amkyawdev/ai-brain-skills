import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>
      <div className="stat-info">
        <h4>{title}</h4>
        <div className="value">{value}</div>
      </div>
    </div>
  );
}
