import { apiClient } from "@/services/axios";

interface DashboardResponse {
  currently_in_clinic_count: number;
  total_students: number;
  total_visits: number;
  currently_in_clinic: CurrentlyInClinic[];
}

interface CurrentlyInClinic {
  id: number;
  student_id: string;
  name: string;
  bed_id: string;
  check_in_time: string;
}

export const getDashboard = () =>
  apiClient.get<DashboardResponse>("/dashboard");
