import dotenv from "dotenv";
dotenv.config();

export const getEnvIp = () => {
    // alert(process.env.NODE_ENV)
    // alert(process.env.NODE_ENV === 'development')
    // alert(process.env.REACT_APP_SERVER_IP)
    // alert(process.env.DEV_SERVER_IP)
    if (process.env.NODE_ENV === 'development') {
        return {
            CLIENT_IP: process.env.REACT_APP_DEVELOPMENT_CLIENT_IP,
            SERVER_IP: process.env.REACT_APP_DEVELOPMENT_SERVER_IP
        };
    }
    else if (process.env.NODE_ENV === 'production') {
        return {
            CLIENT_IP: process.env.REACT_APP_PRODUCTION_CLIENT_IP,
            SERVER_IP: process.env.REACT_APP_PRODUCTION_SERVER_IP
        };
    }
}