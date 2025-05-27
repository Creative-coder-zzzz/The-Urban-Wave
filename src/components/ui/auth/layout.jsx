import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-yellow-200 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-purple-500">
            Welcome to THE URBAN WAVE
          </h1>
        </div>
      </div>

      {/* Right side with the Outlet */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
