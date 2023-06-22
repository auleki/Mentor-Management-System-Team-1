export type ResourceType = {
  id: number;
  name: string;
  position: string;
  pronouns: string[];
  roles: string[];
};

export interface ITask {
  assigness: [];
  title: string;
  status: string;
  priority: string;
  duration: string;
  details: string;
  created_at: string;
  updated_at: string;
  start_date: string;
  start_date_human: string;
  due_date: string;
  due_date_human: string;
  is_completed: boolean;
  id: string;
}

export type MentorResourceType = "mentors" | "mentor-managers";
