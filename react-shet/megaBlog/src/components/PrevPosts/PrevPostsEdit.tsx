import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserPosts } from '../../store/postSlice';
import { useEffect } from 'react';
import newService from '../../appwrite/config';

const PrevPostsEdit = ({ className = "", suggestedtext = "Edit your previous posts :", exceptSlug = "" }: { className?: string, suggestedtext?: string, exceptSlug?: string }) => {
    const userPosts = useSelector((state: any) => state.allUsersPosts);
    const dispatch = useDispatch();

    const slugToNormal = (slug: string) => {
        const x = slug.replace(/\-+/g, " ").trim();

        return x[0].toUpperCase() + x.slice(1);
    };

    useEffect(() => {
        const hehe = async () => {
            const response = await newService.getPosts([]);

            let newNames: string[] = [];
            let newSlugs: string[] = [];

            if (response) {
                response.rows.forEach((row) => (
                    newNames.push(slugToNormal(row.$id)),
                    newSlugs.push(row.$id)
                ));
            };

            if (exceptSlug !== "") {
                const found = newSlugs.indexOf(exceptSlug);

                if (found !== -1) {
                    newNames = newNames.filter((_: any, index: number) => index !== found);
                    newSlugs = newSlugs.filter((_: any, index: number) => index !== found);
                };
            };

            dispatch(setUserPosts({ names: newNames, slugs: newSlugs }));
        }
        hehe();
    }, [exceptSlug]);

    return (
        <div className={`w-full flex flex-wrap gap-4 ${className}`}>
            <div className="py-2 px-4 text-white bg-gray-800 rounded-lg">
                <span>{suggestedtext}</span>
            </div>
            {userPosts && userPosts.names.map((name: string, index: number) => (
                <Link key={name} to={`/edit-post/${userPosts.slugs[index]}`} className="outline-1 outline-black hover:bg-slate-200 transition-colors ease-in-out duration-150 bg-white px-4 py-2 rounded-lg">
                    {name}
                </Link>
            ))}
        </div>
    );
};

export default PrevPostsEdit
