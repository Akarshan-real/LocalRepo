import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold">
                    {error.status} - {error.statusText}
                </h1>
                <p className="mt-4 text-gray-500">
                    {error.data || "Something went wrong"}
                </p>
            </div>
        );
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <h1 className="text-4xl font-bold">
                Unexpected Error Occurred
            </h1>
        </div>
    );
};

export default Error;