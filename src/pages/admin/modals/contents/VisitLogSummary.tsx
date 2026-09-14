import { useParams } from "react-router-dom";

import { useAuthStore } from "@/stores/useAuthStore";
import { useStudentActivityLogs } from "@/hooks/students/useStudentActivityLogs";
import StudentActivityLogs from "@/pages/admin/student/components/StudentActivityLogs";

export default function VisitLogSummary({ date, id }: { date: any, id: any }) {
    const userId = useAuthStore((state) => state.user?.id);
    const { studentNumber } = useParams();
    const studentActivityLogsQuery = useStudentActivityLogs({ date, performed_by: Number(id) });

    console.log(studentActivityLogsQuery.data, "studentActivityLogsQuery.data")
    return <><StudentActivityLogs date={date} userId={userId} studentNumber={Number(studentNumber)} /></>
}