export function getOSAndBrowser(){
    const os = navigator.platform;
    const userAgent = navigator.userAgent;
    console.log(userAgent);
    let info = "";
    let tempArray = "";
    if(os.indexOf("Win") > -1){
        if(userAgent.indexOf("Windows NT 5.0") > -1){
            info += "Windows 2000";
        }else if(userAgent.indexOf("Windows NT 5.1") > -1){
            info += "Windows XP";
        }else if(userAgent.indexOf("Windows NT 5.2") > -1){
            info += "Windows 2003";
        }else if(userAgent.indexOf("Windows NT 6.0") > -1){
            info += "Windows Vista";
        }else if(userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1){
            info += "Windows 7";
        }else if(userAgent.indexOf("Windows NT 6.2") > -1 || userAgent.indexOf("Windows NT 6.3") > -1 || userAgent.indexOf("Windows 8") > -1){
            info += "Windows 8";
        }else if(userAgent.indexOf("Windows NT 6.4") > -1 ||userAgent.indexOf("Windows NT 10") > -1){
            info += "Windows 10";
        }else{
            info += "Other";
        }
    }else if(os.indexOf("Mac") > -1){
        info += "Mac";
    }else if(os.indexOf("X11") > -1){
        info += "Unix";
    }else if(os.indexOf("Linux") > -1){
        info += "Linux";
    }else{
        info += "Other";
    }
    info += "/";
    if(/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)){
        tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
    }else if(/[Tt]rident(\/\d+\.\d+)/.test(userAgent)){
        tempArray = /([Tt]rident)\/(\d+\.\d+)/.exec(userAgent);
        if(tempArray[2] === "7.0"){
            tempArray[2] = "11";
        }else if(tempArray[2] === "6.0"){
            tempArray[2] = "10";
        }else if(tempArray[2] === "5.0"){
            tempArray[2] = "9";
        }else if(tempArray[2] === "4.0"){
            tempArray[2] = "8";
        }
        tempArray[1] = "IE";
        info += tempArray[1] + tempArray[2];
    }else if(/[Cc]hrome\/\d+/.test(userAgent)){
        tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
    }else if(/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)){
        tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
        info += tempArray[3] + tempArray[1];
    }else if(/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)){
        tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
    }else{
        info += "unknown";
    }
    return info;
};