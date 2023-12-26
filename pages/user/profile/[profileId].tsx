import GetUserProfile from "@/components/profile/GetUserProfile";
import { useRouter } from "next/router";
import React, { useState } from "react";
type ProfileMode = "profile" | "updateProfile" | "dashboard";
// function UserProfilePage() {
//   const router = useRouter();
//   const [profile, setProfile] = useState<ProfileMode>("profile");
//   if (profile == "profile") {
//     return (
//       <main className="border-2 border-red-700 w-4/5 mx-auto">
//         {router.query.profileId}
//         <GetUserProfile />
//       </main>
//     );
//   } else if (profile === "updateProfile") {
//     return;
//   } else if (profile === "dashboard")
//     return (
//       <main className="border-2 border-red-700 w-4/5 mx-auto">dashboard</main>
//     );
// }
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
function UserProfilePage() {
  return (
    <>
      <Tabs
        defaultValue="account"
        className="w-full md:w-[600px] lg:w-[800px] mx-auto"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="updateProfile">Update Profile</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <GetUserProfile />
        </TabsContent>
        <TabsContent value="updateProfile">update profile</TabsContent>
        <TabsContent value="dashboard">Dashboard</TabsContent>
      </Tabs>
    </>
  );
}

export default UserProfilePage;
