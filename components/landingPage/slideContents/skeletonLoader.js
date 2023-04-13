import { Skeleton } from "@mui/material";
const skeletonLoader=(props)=>{
    return(
        <div className={`flex w-full relative ${props.top?props.top:""}`}>
          <Skeleton animation="wave" variant="rectangular" className="mr-5" width={200} height={130} />
          <div className="w-[70%] flex flex-col">  
            <Skeleton variant="text" animation="wave" width="100%" sx={{ fontSize: '1.3rem' }} />
            <Skeleton variant="text" animation="wave" width="100%" sx={{ fontSize: '1.3rem' }} />
            <Skeleton variant="circular" animation="wave" width={50} height={50} />
          </div>
        </div>
    )
}
export default skeletonLoader;