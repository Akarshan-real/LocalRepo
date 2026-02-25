import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";

const OverlayLoader = ({ children }: { children: ReactNode }) => {
    const globalLoading = useSelector((state: any) => state.ux.loading);

    useEffect(() => {
        document.body.style.overflow = globalLoading ? "hidden" : "auto";
    }, [globalLoading]);
    

    return (
        <div className="relative">

            {children}

            {globalLoading && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center
                        bg-black/40 backdrop-blur-[2px]
                        pointer-events-auto">

                    <div className='w-16 h-16 rounded-full 
                          border-r-4 border-b-transparent 
                          border-b-4 border-t-4 border-l-4 
                          border-black 
                          animate-spin'>
                    </div>

                </div>
            )}
        </div>
    );
};

export default OverlayLoader;