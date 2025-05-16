import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import {Toaster} from 'react-hot-toast';
export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <div className = 'w-full h-auto overflow-x-hidden'>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <div className="flex justify-center h-dvh pt-[100px]">
          <Outlet />
        </div>
        <Toaster position="bottom-right" reverseOrder={false}/>
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </div>
  );
}
