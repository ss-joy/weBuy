import GetUserProfile from "@/components/profile/GetUserProfile";
import React, { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession } from "next-auth/react";
import UpdateProfile from "@/components/profile/UpdateProfile";
function UserProfilePage() {
  const [userId, setUserId] = useState<string | null>("");
  useEffect(() => {
    async function getUserId() {
      const session = await getSession();
      if (session) {
        //@ts-ignore
        setUserId(session?.user!.user_id);
      }
    }
    getUserId();
  }, []);
  return (
    <>
      <Tabs
        defaultValue="profile"
        className="w-full md:w-[600px] lg:w-[800px] mx-auto"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="updateProfile">Update Profile</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <GetUserProfile userId={userId} />
        </TabsContent>
        <TabsContent value="updateProfile">
          <UpdateProfile userId={userId} />
        </TabsContent>
        <TabsContent value="dashboard">Dashboard</TabsContent>
      </Tabs>
    </>
  );
}

export default UserProfilePage;
