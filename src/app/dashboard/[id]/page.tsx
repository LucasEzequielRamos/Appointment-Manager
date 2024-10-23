import { getAllUsers, getUserById } from "@/utils/getUser";
import AdminDashboard from "@/Components/AdminDashboard";

const page = async ({ params }: { params: { id: number } }) => {
  const user = await getUserById(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  const users = await getAllUsers();
  //   const services = await getServices();
  //   const appointments = await getAppointments();
  //   const professionals = await getProfessionals();

  const props = {
    user,
    users,
    services: [],
    appointments: [],
    professionals: [],
  };

  return <AdminDashboard {...props} />;
};

export default page;
