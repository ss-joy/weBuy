export interface ApiResponse<TData = {}> {
  status: "success" | "error";
  data?: TData;
  message:
    | "User created successfully"
    | "Some error happend. Please check details."
    | "User not found"
    | "No products found yet"
    | "Showing list of products"
    | "Please enter all the required informations.."
    | "Could not add product to database. Probaby some server error. Please try again."
    | "Product added successfully!!"
    | "Url/method not supported!"
    | "Something went wrong. Please try again!"
    | "Could sign up the user"
    | "Showing details of single product"
    | "Showing details of single user"
    | "This user is already registered"
    | "Transaction failed.Please try again later"
    | "Transaction succesful!"
    | "User updated successfully"
    | "Showing all prouct transactions";
  error?: {
    errorCode: number;
    errorBody?: any;
  };
}

type TransactionItem = {
  productId: string;
  productQuantity: number;
  productPrice: number;
  _id: string;
};

export type OrderDetails = {
  trxId: string;
  totalCost: number;
  buyerId: string;
  buyerEmail: string;
  trxDate: Date;
  trxStatus: string;
  _id: string;
  transactionsItemsLists: TransactionItem[];
  _v: 0;
};
