import GetUserProfile from "@/components/profile/GetUserProfile";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession, useSession } from "next-auth/react";
import UpdateProfile from "@/components/profile/UpdateProfile";
import Dashboard from "@/components/dashboard/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
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
        //overflow-scroll is must for responsive design
        // overflow-x-scroll md:overflow-visible
        className="w-full md:w-[600px] lg:w-[800px] mx-auto mt-16 overflow-x-scroll md:overflow-visible"
      >
        <TabsList
          style={{ fontWeight: "bold" }}
          className="grid w-full grid-cols-3 font-inter font-bold"
        >
          <TabsTrigger className="text-lg md:text-xl py-0" value="profile">
            Profile
          </TabsTrigger>
          <TabsTrigger
            className="text-lg md:text-xl py-0"
            value="updateProfile"
          >
            Update Profile
          </TabsTrigger>
          <TabsTrigger className="text-lg md:text-xl py-0" value="dashboard">
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <GetUserProfile userId={userId} />
        </TabsContent>
        <TabsContent value="updateProfile">
          <UpdateProfile userId={userId} />
        </TabsContent>
        <TabsContent value="dashboard">
          <Dashboard userId={userId} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default UserProfilePage;

export const getServerSideProps = (async (context) => {
  const sessionFound = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!sessionFound) {
    return {
      redirect: {
        destination: "/helper/no-auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}) satisfies GetServerSideProps<{}>;
