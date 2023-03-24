import Axios from "axios";
import base from "./base";
const generateTranscript = async (blob,id) => {
    let uid, filePath, token, signedURL;
    const res1 = await Axios.post(
        "https://api.sondeservices.com/platform/v1/oauth2/token",
        {
            grant_type: "client_credentials",
            scope: "sonde-platform/users.write sonde-platform/transcriptions.write sonde-platform/transcriptions.read sonde-platform/storage.write",
        },
        {
            headers: {
                Authorization: "Basic MmpkbDRkdWtkbzM2bDBlbmpmYjZwODk1YmQ6MXAyZnI4ZmxkOHRyc2lpdGsxdGF0NzJwY3FrdWtuYTg3ZW1yNzA3cWo1bjNsbHJsdjh1cA==",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    token = res1.data.access_token;
    console.log(token);
    const res2 = await Axios.post(
        "https://api.sondeservices.com/platform/v2/users",
        {
            yearOfBirth: "1985",
            gender: "Female",
            language: "ENGLISH",
            device: {
                type: "MOBILE",
                manufacturer: "VIVO",
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }
    );

    uid = res2.data.userIdentifier;

    const res3 = await Axios.post(
        "https://api.sondeservices.com/platform/v1/storage/files",
        {
            fileType: "wav",
            countryCode: "IN",
            userIdentifier: uid,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }
    );

    signedURL = res3.data.signedURL;
    filePath = res3.data.filePath;
    console.log(filePath);
    console.log(signedURL);
    // const abuffer = await blob.arrayBuffer();
    const mybuffer = Buffer.from(base, "base64");
    const res4 = await Axios.put(signedURL, mybuffer, {
        headers: { "Content-Type": "audio/wave" },
    });

    console.log(res4.status);

    const res5 = await Axios.post(
        "https://api.sondeservices.com/platform/async/v1/transcriptions",
        {
            filePath: filePath,
        },
        {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        }
    );
    const jobid = res5.data.jobId;
    console.log("jobid" + jobid);
    let status="READY";
    let res6;
    while(status==="READY" || status==="IN_PROGRESS"){
    
            res6 = await Axios.get(
                `https://api.sondeservices.com/platform/async/v1/transcriptions/${jobid}`,
                {
                    headers: { Authorization: token },
                }
            )
            console.log(res6)
            status=res6.data.status;
    
    }
    console.log(status);
    if(status==="DONE"){
        const textUrl=res6.data.result.transcripts[0].speechTextURL;
        const textRes=await Axios.get(textUrl)
        console.log(textRes.data)
        await Axios.post("/api/textTranscript",{id,text:textRes.data})
    }
     
}
export default generateTranscript;