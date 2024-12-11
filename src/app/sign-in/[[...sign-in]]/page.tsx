import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-700 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <SignIn />
      </div>
    </div>
  );
}