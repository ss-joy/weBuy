export interface ApiResponse {
  status: "success" | "error";
  data?: unknown;
  message:
    | "User created successfully"
    | "Some error happend. Please check details."
    | "User not found";
  error?: {
    errorCode: number;
    errorDetails: string;
  };
}
