import SideNav from '@/app/components/sidenav/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="">
        <SideNav />
      </div>
      <div>{children}</div>
      
    </div>
  );
}