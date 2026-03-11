import ContentPage from "@/components/Button/Button";
// import Card from "@/components/Card/Card";
import Layout from "@/components/Dashboard/Layout";
import Navbar from "@/components/Navbar/Navbar";
import Card from "@/components/Songs/Card";
import MotionHookExample from "@/components/ui/motion-hook-example";
import AnimatedText from "../components/AnimatedText/AnimatedText";
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/98">
      <AnimatedText />
    </div>
  );
}
