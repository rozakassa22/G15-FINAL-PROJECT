import React, { useEffect, useState } from "react";
import useDashboardData from "@/components/hooks/useDashboardData";
import MemoizedHeatMap from "@/components/Dashboard/student/HeatMap";
import MemoizedSolvedProblemsStats from "@/components/Dashboard/student/SolvedQuestions";
import SubmissionList from "@/components/Dashboard/student/SubmissionList";
import UpcomingExams from "@/components/Dashboard/student/UpcomingExam";
import Image from "next/image";
import Loading from "@/components/common/Loading";
const jwt = require("jsonwebtoken");
import {
  fetchUserProfile,
  UserProfile2,
  updateUserProfilePhoto,
} from "@/store/account/api_caller";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [userData, setUserData] = useState({ fullname: "", role: "" });
  const {
    difficultyData,
    acceptedSubmissionData,
    submissions,
    upcomingExams,
    isLoading,
    error,
  } = useDashboardData();

  const router = useRouter();
  const userId = router.query.id as string;
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile2 | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  useEffect(() => {
    const fetchData = async (token: string, userId: any) => {
      try {
        const data = await fetchUserProfile(token, userId);
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (token && userId !== null) {
      fetchData(token, userId);
    }
  }, [token, userId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col mx-20 gap-6 pb-8 bg-primary bg-opacity-5 p-4 rounded-lg">
      <div className="flex flex-col h-screen/3">
        <div
          className="box-border h-[200px] w-full p-4 rounded-lg"
          style={{
            backgroundImage: "url('/images/2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex flex-row gap-8">
          <Image
            width={64}
            height={64}
            src={userProfile?.photoUrl || "/assets/pro2.png"}
            alt=""
            className="inline-block bg-white border-white border-4 ml-[36px] mt-[-78px] h-36 w-36 p-[-4px] rounded-full ring-2 ring-white text-primary w-20 h-20"
          />
          <div className="flex flex-col">
            <h2 className="text-lg text-white mt-[-54px]">
              {userProfile?.fullName || "Name"}
            </h2>
            <p className="text-sm  text-white">{userProfile?.role || "Role"}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-  md:flex-row gap-6">
          <MemoizedSolvedProblemsStats />
          <UpcomingExams />
        </div>
        <MemoizedHeatMap />
      </div>
      <div className="">
        <h2 className="text-l font-semibold text-gray-800 mt-4">
          Recent Submissions
        </h2>
        <div className="flex flex-col gap-4 mt-12 rounded-lg">
          <SubmissionList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
