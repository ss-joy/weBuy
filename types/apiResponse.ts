export interface ApiResponse {
  status: "success" | "error";
  data?: unknown;
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
