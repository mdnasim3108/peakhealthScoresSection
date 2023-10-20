import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ProfileForm = (props) => {
    return (
        <div className="lg:w-[50%] w-full h-full  lg:pr-10 mt-5 lg:mt-0 ">

            <form className=" bg-white h-full lg:px-7 px-4 py-5 w-full flex flex-col justify-between" onSubmit={props.click}>

                <label className="text-[14px] text-[#323743FF] font-sansSerif">Profile photo</label>

                <div className="flex items-center lg:justify-start">
                    <div className="rounded-full bg-[#3F4FDBFF] flex items-center w-[130px] h-[130px] mr-2">
                        <FontAwesomeIcon icon={faUser} className="w-[4rem] h-[8rem] text-white mx-auto" />
                    </div>
                    <input id="ipfile" type="file" className="hidden" placeholder="Choose image" />
                    <label for="ipfile" className="p-1 font-sansSerif text-[#3F4FDBFF] text-[12px] border-[#3F4FDBFF] outline-none border-2 mr-2">Choose Image</label>
                    <p className="text-[12px] text-[#9095A1FF] cursor-pointer">Remove</p>
                </div>

                <div className="w-full flex lg:flex-row flex-col justify-between">

                    <div className="lg:w-[49%] w-full lg:mt-0 mt-3">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">First Name</label>
                        <input id="fname" className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your first name" required onChange={props.onchange}/>
                    </div>

                    <div className="lg:w-[49%] w-full lg:mt-0 mt-3">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">Last  Name</label>
                        <input id="lname" className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your last name" required onChange={props.onchange} />
                    </div>

                </div>

                <div className="w-full flex lg:flex-row flex-col justify-between">

                    <div className="lg:w-[49%] w-full lg:mt-0 mt-3">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">Gender</label>
                        <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your gender" required />
                    </div>

                    <div className="lg:w-[49%] w-full lg:mt-0 mt-3">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">Year of birth</label>
                        <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Example-1987" required type="number" />
                    </div>

                </div>

                <div className="w-full lg:mt-0 mt-3">
                    <label className="text-[14px] text-[#323743FF] font-sansSerif">Email</label>
                    <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your Email" value={props.email} />
                </div>

                <div className="w-full lg:mt-0 mt-3">
                    <label className="text-[14px] text-[#323743FF] font-sansSerif">LinkedIn</label>
                    <input
                        id="linkedIn"
                        className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif"
                        placeholder="Your LinkedIn link"
                        onChange={props.onchange}
                        required />
                </div>

                <div className="w-full lg:mt-0 mt-3">
                    <label className="text-[14px] text-[#323743FF] font-sansSerif">Occupation</label>
                    <input
                        id="occupation"
                        className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px]  outline-none mt-1 font-sansSerif "
                        placeholder="Your occupation"
                        onChange={props.onchange}
                        required />
                </div>

                {/* <div className=" w-full text-right  pt-3">

                <p className="text-[12px] text-[#9095A1FF] inline cursor-pointer font-sansSerif" onClick={props.click}>Skip</p>

                <button className="bg-[#3F4FDBFF] text-white rounded text-[16px] border px-[16px] py-1 inline-block ml-2 font-sansSerif" type="submit">
                        Save Profile
                </button>

                </div> */}

            </form>

        </div>
    )
}
export default ProfileForm;