import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { slugToNormal } from '../../Helper/Function';
import { useEffect } from 'react';

const PrevPostsEdit = ({ className = "", suggestedtext = "Edit your previous posts :", exceptSlug = "" }: { className?: string, suggestedtext?: string, exceptSlug?: string }) => {
    const userSlugs = useSelector((state : any) => state.allUserSlugs.slugs);
    exceptSlug;

    useEffect(() => {
        console.log(userSlugs);
    }, [])
    

    return (
        <div className={`w-full flex flex-wrap gap-4 ${className}`}>
            <div className="py-2 px-4 text-white bg-gray-800 rounded-lg">
                <span>{suggestedtext}</span>
            </div>
            {userSlugs && userSlugs.map((post: any) => (
                <Link key={post} to={`/edit-post/${post}`} className="outline-1 outline-black hover:bg-slate-200 transition-colors ease-in-out duration-150 bg-white px-4 py-2 rounded-lg">
                    {slugToNormal(post)}
                </Link>
            ))}
        </div>
    );
};

export default PrevPostsEdit
