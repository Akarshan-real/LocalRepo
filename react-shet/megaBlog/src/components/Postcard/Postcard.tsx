import { Link } from 'react-router-dom';
import newService from '../../appwrite/config';
import { type AppWriteTableType } from '../../Types/Table.type';

const PostCard = ({ $id, title, featuredImage }: Pick<AppWriteTableType, "$id" | "title" | "featuredImage">) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-(--card) border border-(--border) rounded-xl p-4 transition hover:bg-(--surface)'>
                <div className='w-full flex justify-center mb-4 overflow-hidden rounded-xl'>
                    <img className='rounded-xl' src={newService.getFileView(featuredImage)} alt={title} />
                </div>
                <h2 className='text-xl font-bold text-(--text) hover:text-(--primary) transition'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;
