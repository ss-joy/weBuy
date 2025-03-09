import { Product } from "./products-type";

export type User = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  roles: string[];
  createdAt: Date;
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
  productCategory: string;
  availableCount: number;
};

export type OrderedProductDetails = {
  orderedProductsCount: number;
  productId: string;
};
export type ConfirmOrder = {
  buyerId: string;
  sellerIds: string[];
  transactionAmount: number;
  orderedProducts: OrderedProductDetails[];
  ///utc time string
  expectedDate: string;
};
