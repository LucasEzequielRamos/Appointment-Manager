import { getUserById } from "@/utils/getUser";
import AdminDashboard from "@/Components/Dashboards/AdminDashboard";
import ClientDashboard from "@/Components/Dashboards/ClientDashboard";
import ProfessionalDashboard from "@/Components/Dashboards/ProfessionalDashboard";

const page = async ({ params }: { params: { id: number } }) => {
  const user = await getUserById(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  // const users = await getAllUsers();
  //   const services = await getServices();
  //   const appointments = await getAppointments();
  //   const professionals = await getProfessionals();

  const props = {
    user,
    // users,
    // services: [],
    // appointments: [],
    // professionals: [],
  };

  return user.role === "ADMIN" ? (
    <AdminDashboard {...props} />
  ) : user.role === "CLIENT" ? (
    <ClientDashboard {...props} />
  ) : (
    <ProfessionalDashboard {...props} />
  );
};

export default page;
