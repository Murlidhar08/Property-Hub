export const PropertyCard = () => {

    return (
        <div className="max-w-sm bg-skin-primary border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="p-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            </a>
            <a href="#">
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
            </a>
            <div className="px-5 pt-5">
                <p className="font-bold text-gray-700 dark:text-gray-400">Dwarka</p>
            </div>
            <div className="px-5">
                <p className="font-normal text-gray-700 dark:text-gray-400">2250 - Foot</p>
            </div>
            <div className="px-5">
                <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">₹13000 Sale</p>
            </div>
        </div>

    );
};