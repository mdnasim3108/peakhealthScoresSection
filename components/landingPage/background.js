const background=(props)=>{
    return (
        <div className="w-full md:h-[100vh] h-max bg-gray-300 flex items-center justify-center">
            {props.children}
        </div>
    )
}
export default background