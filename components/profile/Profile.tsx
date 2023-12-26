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
import { getSession } from "next-auth/react";
type ProfileProps = {
  logout: () => void;
};
function Profile({ logout }: ProfileProps) {
  const router = useRouter();
  async function gotoProfilePage() {
    const session = await getSession();
    if (!session) {
      console.log("no session found");
      alert("please login first");
    }
    //@ts-ignore
    router.push(`/user/profile/${session?.user!.user_id}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="rounded-full transition-all hover:shadow-md hover:shadow-slate-500"
          src={"/ui-images/dummy-user.jpg"}
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
          onClick={logout}
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
