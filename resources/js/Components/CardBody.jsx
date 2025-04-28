export default function CardBody({
    ...props
}) {
    return (<div className="pt-4">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className=" m-1 border overflow-x-auto">
                    {props.children}
                </div>
            </div>
        </div>
    </div>);
}