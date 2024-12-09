import GetUserProfile from "@/components/profile/UserProfile";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession, useSession } from "next-auth/react";
import Dashboard from "@/components/profile/dashboard/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { PackageOpen, TableOfContents, UserPen } from "lucide-react";
import Link from "next/link";
import UserProfile from "@/components/profile/UserProfile";
import Inventory from "@/components/profile/dashboard/inventory/Inventory";
import Loading from "@/components/ui/Loading";

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
  const router = useRouter();
  console.log(router.query);

  const iconClassNames = "text-orange-400";
  const dashBoardNavigaitionItems = [
    {
      value: "Profile",
      icon: <UserPen className={iconClassNames} />,
      tabItem: "profile",
    },
    {
      value: "Overview",
      icon: <TableOfContents className={iconClassNames} />,
      tabItem: "overview",
    },
    {
      value: "Inventory",
      icon: <PackageOpen className={iconClassNames} />,
      tabItem: "inventory",
    },
  ] as const;

  type TabItems = (typeof dashBoardNavigaitionItems)[number]["tabItem"];

  const { tab } = router.query as { tab: TabItems };

  useEffect(() => {
    if (!tab && userId) {
      router.push(`/user/${userId}?tab=${"profile"}`);
    }
  }, [tab, userId]);
  if (!userId) return <Loading />;

  return (
    <>
      <main className="flex gap-4 px-8 mx-auto rounded-md">
        <aside
          id="sideNavBar"
          className="border-2 w-1/5 p-4 rounded-md  min-h-[80vh]"
        >
          <span className="inline-block p-2 my-4 text-orange-400 font-bold text-2xl">
            Dashboard
          </span>
          <section className="flex flex-col gap-2">
            {dashBoardNavigaitionItems.map((item) => (
              <Link
                href={{
                  pathname: `/user/${userId}/`,
                  query: { tab: item.tabItem },
                }}
                className={`inline-flex items-center transition-all gap-4 p-2 hover:cursor-pointer hover:bg-slate-400 rounded-md ${tab === item.tabItem ? " bg-orange-100 rounded-md " : " "}`}
              >
                {item.icon}
                <span className="text-xl font-bold text-blue-950/90">
                  {item.value}
                </span>
              </Link>
            ))}
          </section>
        </aside>
        <section
          id="dashboard-content"
          className="border-2 w-4/5 p-4 rounded-md"
        >
          {tab === "profile" ? <UserProfile userId={userId} /> : null}
          {tab === "overview" ? <Dashboard userId={userId} /> : null}
          {tab === "inventory" ? <Inventory userId={userId} /> : null}
        </section>
      </main>
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
