import './App.css';
import { useState } from "react";
import Dashboard from './pages/dashboard/DashboardPage';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Login from "./pages/login/Login";
import Sidebar, { SidebarItem } from "./components/side-bar/Sidebar";
import { HiMiniChartPie } from "react-icons/hi2";
import { MdOutlinePets, MdSick, MdAssignment, MdCalendarMonth, MdCamera, MdCameraAlt } from "react-icons/md";
import { BiSolidBarChartSquare } from "react-icons/bi";
import Header from "./components/header/Header";
import Breadcrumb_Comp from "./components/breadcrumb/Breadcrumb_Comp";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
const queryClient = new QueryClient();


const SIDEBAR_ITEMS = [
  { text: "Tổng quan", url: "/dashboard", icon: <HiMiniChartPie /> },
  {
    text: "Thời khóa biểu",
    url: "/dashboard",
    icon: <MdCalendarMonth />,
    
  },
  {
    text: "Camera",
    url: "/dashboard",
    icon: <MdCameraAlt />,
    subItems: [
      { text: "Công việc", url: "/job/manage" },
      { text: "Báo cáo", url: "/job/report" },
    ],
  },
  {
    text: "Quản lý lớp học",
    url: "/dashboard",
    icon: <BiSolidBarChartSquare />,
  
  },
  
];

function App() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ name: string; url: string }[]>([]);
  const handleSidebarSelect = (selectedPath: string) => {
    const foundItem = SIDEBAR_ITEMS.find(
      (item) => item.url === selectedPath || item.subItems?.some((sub) => sub.url === selectedPath)
    );
    if (foundItem) {
      const selectedSub = foundItem.subItems?.find((sub) => sub.url === selectedPath);
      setBreadcrumbItems([
        { name: foundItem.text, url: foundItem.url },
        ...(selectedSub ? [{ name: selectedSub.text, url: selectedSub.url }] : []),
      ]);
    }
  };
  const Layout = () => {
    return (
    <div className="flex">
      <div className="flex-1 max-w-[345px] box-border">
        <Sidebar>
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.url}
              icon={item.icon}
              text={item.text}
              url={item.url}
              onSelect={handleSidebarSelect}
              subItems={item.subItems}
            />
          ))}
        </Sidebar>
      </div>

      <main className="flex-5 py-4 px-6">
        <Header />
        <Breadcrumb_Comp items={breadcrumbItems} onNavigate={(url) => console.log("Navigate to:", url)} />
        <>
          <QueryClientProvider client={queryClient}>
                <Outlet />
          </QueryClientProvider>
        </>
      </main>
    </div>

    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/herds/manage",
          element: <Dashboard />,
        },
        {
          path: "/herds/abnormal-detection",
          element: <Dashboard />,
        },
        {
          path: "/herds/report",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;