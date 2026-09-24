
import StudentActivityLogs from "@/pages/admin/student/components/StudentActivityLogs";

export default function VisitLogSummary({ date, studentNumber }: { date: any, studentNumber: any }) {


    return <><StudentActivityLogs date={date} userId={studentNumber} studentNumber={studentNumber} /></>
}