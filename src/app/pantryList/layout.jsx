import SideNav from "../ui/sidenav";
// imp ort { AuthProvider } from "../firebase/authContext";


export default function Layout( {children} ) {
    return (
      
        <div className="flex h-screen bg-white flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>

    );
}