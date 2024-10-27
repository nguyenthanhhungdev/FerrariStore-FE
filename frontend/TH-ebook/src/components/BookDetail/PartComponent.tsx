const PartComponent = () => {
    return (
        <>

            <div className="flex-row ">
                <h3 className="text-lg font-bold text-black mb-2 ">Part: </h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Part 1</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">Part 2</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Part 3</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">Part 4</button>
            </div>

        </>
    )
}

export default PartComponent;