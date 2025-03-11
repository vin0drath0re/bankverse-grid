
import { BellRing, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="h-full">
      <h3 className="font-medium mb-4">Recent Activity</h3>
      
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <BellRing className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="p-3 bg-blue-100 rounded-full mb-3">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-medium mb-1">No Recent Activity</h4>
          <p className="text-sm text-muted-foreground">Your recent account activities will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
