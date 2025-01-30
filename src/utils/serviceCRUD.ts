import { auth } from "@/auth";
import config from "./config";

export async function getServiceById(id: number): Promise<any> {
  try {
    const userData = await auth();

		if (userData !== undefined) {
			const res = await fetch(`${config.NEXT_API_URL}/service/${id}`, {
				method: "GET",
			});

			const { service } = await res.json();
			return service;
		} else {
			return null;
		}
	} catch (error) {

	}
}

export async function fetAllServices(): Promise<any> {
	try {
		const res = await fetch(`${config.NEXT_API_URL}/service`, {
			method: "GET",
		});

		const { service: servicesList } = await res.json();
		return servicesList;
	} catch (error) {
		console.log(error);
	}
	
}

export async function deleteServiceById(id: number): Promise<any> {
	try {
		const res = await fetch(`${config.NEXT_API_URL}/service/${id}`, {
			method: "DELETE",
			body: JSON.stringify(id)
		});

		const { service: servicesList} = await res.json();
		return servicesList;
	} catch (error) {
		console.log(error);
	}
}