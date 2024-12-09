import { Product } from "./products-type";

export type User = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
};

export type UpdateProfileFormData = {
  userName: string;
  userPwd: string;
  userImage: string;
  userEmail: string;
};

export type SubmissionData = {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
};

export type UserProducts = User & {
  products: Product[];
};

export type CreateProductFromData = {
  description: string;
  price: number;
  name: string;
  productCategory: string;
  availableCount: number;
};
export type CreateProductSubmissionData = {
  name: string;
  description: string;
  price: number;
  imagePath: string;
  sellerId: string;
  productCategory: string;
  availableCount: number;
};
