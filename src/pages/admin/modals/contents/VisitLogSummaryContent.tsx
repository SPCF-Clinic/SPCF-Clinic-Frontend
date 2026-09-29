
import StudentActivityLogs from "@/pages/admin/student/components/StudentActivityLogs";

export default function VisitLogSummaryContent({ date, studentNumber, height }: { date: any, studentNumber: any, height?: string | number | undefined }) {

    return <><StudentActivityLogs date={date} userId={studentNumber} studentNumber={studentNumber} height={height} /></>
}