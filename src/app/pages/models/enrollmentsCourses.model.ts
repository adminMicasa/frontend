export interface EnrollmentCourse {
  id: number
  state: string
  courseId: Course
  member: Member
}

export interface Course {
  id: number
  name: string
  active: boolean
  startDate: string
  endDate: string
}

export interface Member {
  id: number
  names: string
  lastnames: string
  age: number
  sex: string
  phone: string
  email: string
  district: string
  volunteer: boolean
  active: boolean
}



