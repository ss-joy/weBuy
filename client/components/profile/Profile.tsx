import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOutIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/router";
import { useLogOutMutation } from "@/store/features/auth/authApi";
import { useGetUserQuery } from "@/store/features/user/userApi";
import Loading from "../ui/Loading";
import ErrorMsg from "../ui/ErrorMsg";

type ProfileProps = {
  userId: string;
};
function Profile({ userId }: ProfileProps) {
  const router = useRouter();
  const [logOut] = useLogOutMutation();

  async function gotoProfilePage() {
    router.push(`/user/${userId}`);
  }

  const { error, isLoading, data } = useGetUserQuery(
    { userId },
    {
      skip: !userId,
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <ErrorMsg />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="rounded-full transition-all hover:shadow-md hover:shadow-slate-500"
          src={
            data?.profilePicture
              ? data?.profilePicture
              : "/ui-images/dummy-user.jpg"
          }
          width={40}
          height={40}
          alt="profile image of user"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="focus:border-2 focus:border-blue-400"
            onClick={gotoProfilePage}
          >
            Profile
            <DropdownMenuShortcut>
              <User2Icon className="p-1" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="focus:border-2 focus:border-blue-400"
          onClick={() => logOut(undefined)}
        >
          Log out
          <DropdownMenuShortcut>
            <LogOutIcon className="p-1" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;
