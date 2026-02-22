import { Link } from 'react-router-dom';
import newService from '../../appwrite/config';
import {type AppWriteTableType } from '../../Types/Table.type';

const PostCard = ({ $id, title, featuredImage } : Pick<AppWriteTableType,"$id" | "title" | "featuredImage">) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img className='rounded-xl' src={newService.getFileView(featuredImage)} alt={title} />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
