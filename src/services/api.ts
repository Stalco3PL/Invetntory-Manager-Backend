// api.js
import axios from "axios";
import { BASE_URL, CUSTOMERS_URL } from "../constants";

export interface CustomerData {
    customerId: number;
    companyName: string;
    deactivated: boolean;
  }

export async function fetchCustomers() {
    try {
      const response = await axios.get(BASE_URL + CUSTOMERS_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching Customers data:", error);
      throw error;
    }
  }

// async function request(url, options) {
//   const response = await fetch(url, options);
//   if (!response.ok) {
//     throw new Error(`Request failed with status ${response.status}`);
//   }
//   return response.json();
// }

// export async function get(endpoint) {
//   const url = `${BASE_URL}/${endpoint}`;
//   return request(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any necessary authentication headers here
//     },
//   });
// }

// export async function post(endpoint, data) {
//   const url = `${BASE_URL}/${endpoint}`;
//   return request(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any necessary authentication headers here
//     },
//     body: JSON.stringify(data),
//   });
// }

