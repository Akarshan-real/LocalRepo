import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import newService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type PostType } from '../../Types/Post.type';
import { setLoading } from '../../store/uxSlice';

type FormType = {
    title: string,
    slug: string,
    image: FileList,
    status: "active" | "inactive",
    content: string,
};

type PostPropType = PostType & { slug: string, $id: string }

const PostForm = ({ post }: { post?: PostPropType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userdata = useSelector((state: any) => state.auth.userData);

    const slugTransform = useCallback((value: unknown): string => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/\s+/g, "-");
        }
        return "";
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors }
    } = useForm<FormType>({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    useEffect(() => {
        console.log(errors);
    }, [errors]);
    
    const submit = async (data: Omit<FormType, "image"> & { image?: FileList }) => {
        dispatch(setLoading(true));
        try {
            if (post) {
                console.log("Updating post");
                const file = data.image?.[0] ? await newService.uploadFile(data.image[0]) : null;
                console.log("File : ", file);

                if (file) {
                    await newService.deleteFile(post.featuredImage);

                    const dbUpdate = await newService.updatePost(post.$id, {
                        ...data,
                        featuredImage: file.$id
                    });

                    if (dbUpdate) {
                        navigate(`/post/${dbUpdate.$id}`);
                    };
                }
                else {
                    const dbUpdate = await newService.updatePost(post.$id, {
                        ...data
                    });

                    if (dbUpdate) {
                        navigate(`/post/${dbUpdate.$id}`);
                    };
                };
            }
            else {
                console.log("Creating post");
                const file = data.image?.[0] ? await newService.uploadFile(data.image[0]) : null;
                console.log("File : ", file);

                if (file) {
                    const fileId = file.$id;
                    if (userdata) {
                        const dbPost = await newService.createPost({
                            title: data.title,
                            slug: data.slug,
                            content: data.content,
                            status: data.status,
                            featuredImage: fileId,
                            userId: userdata.$id
                        });
                        if (dbPost) {
                            navigate(`/post/${dbPost.$id}`);
                        };
                    };
                };
            };
        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch(setLoading(false));
        };
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            };
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    readOnly
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 cursor-pointer"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={newService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
