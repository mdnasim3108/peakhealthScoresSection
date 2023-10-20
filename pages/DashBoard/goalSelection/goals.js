import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
const goals = (props) => {
    const [options, setOptions] = useState(props.options.map((option) => { return { id: option + "_" + props.title, value: option, selected: false } }))



    useEffect(()=>{
        if(props.prevGoals){
            const ids=options.map((el,id)=>props.prevGoals.includes((el.id.split("_")[0]))?id:-1)
            const selectIds=ids.filter(id=>id!==-1)
            setOptions((prev)=>{
                return prev.map((goals)=>{
                    if(selectIds.includes(prev.indexOf(goals)))
                        return {...goals,selected:true}
                    else return goals
                })
            })
        }
    },[])    

    useEffect(() => {
        const check = options.filter((el) => el.selected === true)
        props.select(props.title, check.map((el) => el.value))
    }, [options])

    const optionClickHandler = (event) => {
        const index = options.findIndex((el) => el.id === event.target.id)
        const newOptions = [...options]
        const obj = newOptions[index]
        if (props.count<3 && !obj.selected) {
            newOptions[index] = { ...obj, selected: true }
            setOptions(newOptions)
        }
        if(props.count<=3 && obj.selected){
            newOptions[index] = { ...obj, selected: false }
            setOptions(newOptions)
        }



    }
    return <div className="w-[580px] h-[26%] bg-white rounded-[6px] border-[1.5px] z-10 shadow-sm border-gray-300 p-5">

        <div className="flex">
            <FontAwesomeIcon icon={props.icon} className="w-[1.5rem] mr-2 text-gray-300" />
            <h1 className="text-[#171A1FFF] text-[18px]">{props.title}</h1>
        </div>

        <div className="">

            {
                options.map((option) => {
                    return <div
                        id={option.id}
                        key={Math.random()}
                        className={`w-max p-2 py-1 border-[1.5px] ${option.selected ? "bg-[#3F4FDBFF] text-white " : "bg-[#F3F4F6FF] text-[#323743FF]"}  mr-1 inline-block mt-3 rounded-full transition-all duration-[700ms] ease-in-out  text-[14px]  cursor-pointer`}
                        onClick={optionClickHandler}
                    >
                        {option.value}
                    </div>
                })
            }

        </div>

    </div>
}
export default goals;