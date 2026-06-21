import React from 'react';
import { Activity, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'create' | 'update' | 'load' | 'delete';
  skill: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const activityIcons = {
  create: '+',
  update: '~',
  load: '>',
  delete: '-'
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="activity-list">
      {activities.slice(0, 5).map(activity => (
        <div key={activity.id} className="activity-item">
          <span className="activity-icon">{activityIcons[activity.type]}</span>
          <div>
            <div className="activity-skill">{activity.skill}</div>
            <div className="activity-time">
              <Clock size={12} /> {activity.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
