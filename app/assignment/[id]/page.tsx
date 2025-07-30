import { AssignmentSubmission } from "@/components/assignment/assignment-submission"

export default function AssignmentSubmissionPage({ params }: { params: { id: string } }) {
  return <AssignmentSubmission assignmentId={params.id} />
}
