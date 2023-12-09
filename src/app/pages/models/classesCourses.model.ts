export interface ClassCourse {
  id: number;
  numberClass: number;
  classDate: string;
  topicId: Topic;
  courseId: Course;
}

interface Course {
  id: number;
  name: string;
  active: boolean;
  startDate: string;
  endDate: string;
}

interface Topic {
  id: number;
  topic: string;
  idTopic: number;
}
