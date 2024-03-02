export default function Product() {
    return (
        <section className="z-10 w-3/4">
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Brand
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impressions
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 align-top">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-20 w-20">
                                    <img className="h-20 w-20 rounded-md" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/TheNorthFace_logo.svg/1200px-TheNorthFace_logo.svg.png" alt="" />
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-40 w-40">
                                    <img className="h-40 w-40 rounded-md" src="https://cdn-images.farfetch-contents.com/18/89/99/65/18899965_41104914_600.jpg" alt="" />
                                </div>
                                <div className="ml-4 flex-shrink-0 mt-[-50px]">
                                    <div className="text-sm font-medium text-gray-900">
                                        Summer Series Briethorn Jacket
                                    </div>
                                    <div className="text-sm text-gray-500 mt-7">
                                        Lightweight, packable warmth is what makes <br /> the Men’s Summit Series Breithorn Jacket the <br /> perfect layer for all types of alpinism...
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <h1 className="text-3xl font-semi-bold font-black flex flex-col text-gray-800">
                                150k+
                            </h1>
                            <span className="px-8 py-1 mt-2 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800">
                                75%
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <h1 className="text-3xl font-semi-bold font-black flex flex-col text-gray-800">
                                $120
                            </h1>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-6xl">
                            <img className="h-10 w-10" src="https://t4.ftcdn.net/jpg/03/76/69/25/360_F_376692508_XUzZzz0x3W34II8NlIOfqZQ2Lc26kh58.jpg" alt="" />
                        </td>
                    </tr>

                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-20 w-20">
                                    <img className="h-20 w-20 rounded-md" src="https://devinfo.in/wp-content/uploads/job-manager-uploads/company_logo/2024/01/nike.jpg" alt="" />
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-40 w-40">
                                    <img className="h-40 w-40 rounded-md" src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e7687f1-c13e-4bac-8ffa-a6f863ae9157/dunk-high-retro-shoe-DdRmMZ.png" alt="" />
                                </div>
                                <div className="ml-4 flex-shrink-0 mt-[-50px]">
                                    <div className="text-sm font-medium text-gray-900">
                                    Nike Air Max 1
                                    </div>
                                    <div className="text-sm text-gray-500 mt-7">
                                    Meet the leader of the pack. Walking on <br /> clouds above the noise, the Air Max 1 blends <br /> timeless design with cushioned comfort...
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <h1 className="text-3xl font-semi-bold font-black flex flex-col text-gray-800">
                                150k+
                            </h1>
                            <span className="px-8 py-1 mt-2 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800">
                                75%
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <h1 className="text-3xl font-semi-bold font-black flex flex-col text-gray-800">
                                $120
                            </h1>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-6xl">
                            <img className="h-10 w-10" src="https://t4.ftcdn.net/jpg/03/76/69/25/360_F_376692508_XUzZzz0x3W34II8NlIOfqZQ2Lc26kh58.jpg" alt="" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}