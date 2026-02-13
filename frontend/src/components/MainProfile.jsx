import { useState } from "react";

export default function MainProfile() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);

  return (
    <div className="min-h-screen max-w-4xl">
      <div className=" p-6 md:p-10 mx-auto bg-white space-y-8">

        {/* Personal Info */}
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Personal Information</h2>
            <button
              onClick={() => setIsEditingPersonal(!isEditingPersonal)}
              className="text-blue-600 font-medium"
            >
              {isEditingPersonal ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              disabled={!isEditingPersonal}
              className="border border-gray-200 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              disabled={!isEditingPersonal}
              className="border border-gray-200 p-2 rounded"
            />
          </div>

          <div className="mt-4">
            <p className="mb-2">Your Gender</p>
            <div className="flex gap-6">
              <label>
                <input
                  type="radio"
                  name="gender"
                  disabled={!isEditingPersonal}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  disabled={!isEditingPersonal}
                />{" "}
                Female
              </label>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Email Address</h2>
            <button
              onClick={() => setIsEditingEmail(!isEditingEmail)}
              className="text-blue-600 font-medium"
            >
              {isEditingEmail ? "Cancel" : "Edit"}
            </button>
          </div>
          <input
            type="email"
            placeholder="Email"
            disabled={!isEditingEmail}
            className="border border-gray-200 p-2 w-full rounded"
          />
        </div>

        {/* Mobile */}
        <div className="md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Mobile Number</h2>
            <button
              onClick={() => setIsEditingMobile(!isEditingMobile)}
              className="text-blue-600 font-medium"
            >
              {isEditingMobile ? "Cancel" : "Edit"}
            </button>
          </div>
          <input
            type="text"
            defaultValue="+917972002490"
            disabled={!isEditingMobile}
            className="border border-gray-200 p-2 w-full rounded"
          />
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-semibold text-lg mb-4">FAQs</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <h4 className="font-medium">
                What happens when I update my email or mobile?
              </h4>
              <p>
                Your login details will change and account communication will
                go to the updated contact.
              </p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="flex flex-col items-start gap-2.5">
          <button className="text-blue-500 font-medium">
            Deactivate Account
          </button>
          <button className="text-red-500 font-semibold">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}