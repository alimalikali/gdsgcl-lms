import { CourseDetails } from "@/components/course/course-details"

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  return <CourseDetails courseId={params.id} />
}
