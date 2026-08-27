import { useSpecificStudent } from "@/query/student-dashboard";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

export default function Updatedetails() {
  const { student_number } = useParams();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const { data, isLoading, isError, error } = useSpecificStudent(
    Number(student_number),
  );

  console.log("Type clicked:", type); // Outputs: "personal" or "medical"

  return (
    <div>
      {type === "personal" && <div>Personal Details Content</div>}
      {type === "medical" && <div>Medical History Content</div>}
    </div>
  );
}