import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <div className = 'w-full h-auto overflow-x-hidden'>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <div className="flex justify-center items-center h-dvh">
          <Outlet />
        </div>
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </div>
  );
}
