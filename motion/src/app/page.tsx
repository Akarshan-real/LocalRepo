import ContentPage from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Layout from "@/components/Dashboard/Layout";
import MotionHookExample from "@/components/ui/motion-hook-example";
export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <MotionHookExample />
    </div>
  );
}
