import { sendImage } from "../../utils/sendImage";
import Customer from "./customer.model";
import { TCustomer } from "./customer.type";

// Create: create Customer
const createCustomer = async (file: any, payload: TCustomer) => {
  try {
    const randomString = (length = 5) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };
    const imagePath = file ? file.path : null;
    if (imagePath) {
      const imageName = `${payload.name}-${randomString()}`;
      const { secure_url } = await sendImage(imagePath, imageName);
      payload.photo = secure_url;
    }
    const data = await Customer.create(payload);
    return data;
  } catch (error) {
    throw error;
  }
};

// Read (All): getAllCustomers
const getAllCustomers = async () => {
  try {
    const data = await Customer.find();
    return data;
  } catch (error) {
    throw error;
  }
};

export const CustomerService = {
  createCustomer,
  getAllCustomers,
};
