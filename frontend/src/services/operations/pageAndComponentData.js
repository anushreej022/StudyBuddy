import React from 'react'
// import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';


// ================ get Catalog Page Data  ================
// export const getCatalogPageData = async (categoryId) => {
//   // const toastId = toast.loading("Loading...");
//   let result = [];
//   try {
//     const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
//       { categoryId: categoryId, });

//     if (!response?.data?.success)
//       throw new Error("Could not Fetch Category page data");

//     console.log("CATALOG PAGE DATA API RESPONSE............", response)
//     result = response?.data?.data;

//   }
//   catch (error) {
//     console.log("CATALOG PAGE DATA API ERROR....", error);
//     // toast.error(error.response?.data.message);
//     result = error.response?.data.data;
//   }
//   // toast.dismiss(toastId);
//   return result;
// }

import { toast } from 'react-toastify';

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  return new Promise(resolve => {
    setTimeout(() => {
      // Mock response structure, adjust according to your needs
      const mockedResponse = {
        data: {
          success: true,
          data: [
            // Add mock data items here
            { id: 1, name: 'Product A', description: 'Description of Product A', price: 20 },
            { id: 2, name: 'Product B', description: 'Description of Product B', price: 30 },
            // etc.
          ]
        }
      };

      if (!mockedResponse.data.success) {
        const error = new Error("Could not Fetch Category page data");
        console.log("CATALOG PAGE DATA API ERROR....", error);
        // Optionally handle error showing in UI
        // toast.error("Failed to fetch data");
        result = []; // Assuming failure means no data to show
      } else {
        console.log("CATALOG PAGE DATA API RESPONSE............", mockedResponse)
        result = mockedResponse.data.data;
      }

      toast.dismiss(toastId);
      resolve(result);
    }, 1000); // Set timeout to simulate network delay
  });
}


