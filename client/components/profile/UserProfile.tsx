import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import ErrorMsg from "../ui/ErrorMsg";
import Loading from "../ui/Loading";
import { FingerprintIcon, MailIcon, Pen, UserCircleIcon } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import axios from "axios";
import { User } from "@/types";
import { ecomBackendUrl } from "@/config";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

type GetUserProfileProps = {
  userId: string | null;
};

function UserProfile({ userId }: GetUserProfileProps) {
  console.log("userid from userProfile", userId);
  const { error, isLoading, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => axios.get<User>(`${ecomBackendUrl}/user/${userId}`),
    enabled: userId ? true : false,
    staleTime: Infinity,
  });
  console.log("here====>", data);

  if (error) {
    return <ErrorMsg />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-24 mx-auto w-1/2 shadow-md shadow-slate-400 p-4 flex flex-col gap-4 rounded-lg items-center text-center">
      <div
        id="image-container"
        className="size-40 lg:size-56 rounded-full relative"
      >
        <Image
          className="rounded-full w-full transition-all h-full block mx-auto object-cover"
          src={
            data?.data.profilePicture
              ? data?.data.profilePicture
              : "/ui-images/dummy-user.jpg"
          }
          width={300}
          height={300}
          alt="profile image of user"
        />
        <EditProfileModal
          name={data?.data.name as string}
          email={data?.data.email as string}
          profileImage={data?.data.profilePicture as string}
          userId={userId as string}
        />
      </div>

      <div id="info-container" className="w-full mx-auto p-2">
        <p className="text-slate-500 mb-8">
          You can change your name, email ,profile image anytime..
        </p>
        <p className="text-gray-600 font-bold mb-4 break-words flex items-center justify-start flex-wrap gap-2">
          <UserCircleIcon />
          {isLoading ? "Loading..." : data?.data.name}
        </p>
        <p className="text-gray-600 font-bold mb-4 break-words flex items-center justify-start flex-wrap gap-2">
          <MailIcon />
          {isLoading ? "loading..." : data?.data.email}
        </p>
        <p className="text-gray-600 font-bold mb-4 break-words flex items-center justify-start flex-wrap gap-2">
          <FingerprintIcon />
          {isLoading ? "Loading..." : data?.data._id}
        </p>
      </div>
      {/* <ReactQueryDevtoolsPanel
        isOpen={true}
        setIsOpen={() => true}
        onDragStart={() => {}}
      /> */}
    </div>
  );
}

export default UserProfile;
