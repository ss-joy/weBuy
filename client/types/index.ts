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
