import profilePic from "../assets/profile-pic-male.svg";
import MainProfile from "./MainProfile";
import Sidebar from "./Sidebar";
export default function ProfilePage() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto py-5 px-4">
        <div className="flex flex-col md:flex-row gap-3.5 min-h-screen">

          {/* Left Side */}
          <div className="w-full md:w-1/4 flex flex-col gap-3.5">
            <div className="bg-white flex items-center justify-start gap-4 px-2 py-2 rounded-md">
              <img src={profilePic} alt="" />
              <p className="text-lg text-gray-600 font-medium">Saurabh</p>
            </div>

            <div className="bg-white flex-1 rounded-md">
              <Sidebar/>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-3/4 bg-white rounded-md">
           <MainProfile/>
          </div>

        </div>
      </div>
    </div>
  );
}