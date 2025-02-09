import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LayoutProps {
    children: React.ReactNode;
}
const layout = ({ children }: LayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
        <nav className="flex justify-between items-center h-10 px-10 py-6">
            <Image src="logo.svg" alt="Logo" width={30} height={30}/>
            <div>
                <Button>Sign Up</Button>
            </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-10">
            {children}
        </div>
    </main>
  )
}

export default layout