import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ProfileForm = (props) => {
    return (
        <div className="w-[50%] h-full  pr-10 ">

            <form className=" bg-white h-full px-7 py-5 w-full flex flex-col justify-between" onSubmit={props.click}>

                <label className="text-[14px] text-[#323743FF] font-sansSerif">Profile photo</label>

                <div className="flex items-center">
                    <div className="rounded-full bg-[#3F4FDBFF] flex items-center w-[130px] h-[130px] mr-2">
                        <FontAwesomeIcon icon={faUser} className="w-[4rem] h-[8rem] text-white mx-auto" />
                    </div>
                    <input id="ipfile" type="file" className="hidden" placeholder="Choose image" />
                    <label for="ipfile" className="p-1 font-sansSerif text-[#3F4FDBFF] text-[12px] border-[#3F4FDBFF] outline-none border-2 mr-2">Choose Image</label>
                    <p className="text-[12px] text-[#9095A1FF] cursor-pointer font-sansSerif">Remove</p>
                </div>

                <div className="w-full flex justify-between">

                    <div className="w-[49%]">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">First Name</label>
                        <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your first name" required/>
                    </div>

                    <div className="w-[49%]">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">Last  Name</label>
                        <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your last name" required/>
                    </div>

                </div>

                <div className="w-full flex justify-between">

                    <div className="w-[49%]">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">Gender</label>
                        <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your gender" required/>
                    </div>

                    <div className="w-[49%]">
                        <label className="text-[14px] text-[#323743FF] font-sansSerif">Year of birth</label>
                        <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your year of birth" required/>
                    </div>

                </div>

                <div className="w-full">
                    <label className="text-[14px] text-[#323743FF] font-sansSerif">Email</label>
                    <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your Email" required/>
                </div>

                <div className="w-full">
                    <label className="text-[14px] text-[#323743FF] font-sansSerif">LinkedIn</label>
                    <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px] outline-none mt-1 font-sansSerif" placeholder="Your LinkedIn link" required/>
                </div>

                <div className="w-full">
                    <label className="text-[14px] text-[#323743FF] font-sansSerif">Occupation</label>
                    <input className="bg-[#F3F4F6FF] w-full px-[12px] py-[6px] rounded-[2px]  outline-none mt-1 font-sansSerif " placeholder="Select your occupation" required/>
                </div>

                <div className=" w-full text-right  pt-3">

                <p className="text-[12px] text-[#9095A1FF] inline cursor-pointer font-sansSerif" onClick={props.click}>Cancel</p>

                <button className="bg-[#3F4FDBFF] text-white rounded text-[16px] border px-[16px] py-1 inline-block ml-2 font-sansSerif" type="submit">
                        save profile
                </button>

                </div>

            </form>

        </div>
    )
}
export default ProfileForm;