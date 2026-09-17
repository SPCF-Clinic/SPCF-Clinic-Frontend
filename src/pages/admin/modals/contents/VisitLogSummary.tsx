import { useParams } from "react-router-dom";

import { useAuthStore } from "@/stores/useAuthStore";
import { useStudentActivityLogs } from "@/hooks/students/useStudentActivityLogs";
import StudentActivityLogs from "@/pages/admin/student/components/StudentActivityLogs";

export default function VisitLogSummary({ date, studentNumber }: { date: any, studentNumber: any }) {


    return <><StudentActivityLogs date={date} userId={studentNumber} studentNumber={studentNumber} /></>
}