const {ethers} = require("ethers");


export const connectProvider = () => {
    console.log("Connecting to provider...")
    return async (dispatch) => {
        dispatch(providerRequest());
        const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/d163401424514af5bd48d03741865114');
        if (provider) {
            dispatch(
                connectSuccess({
                    ethers: provider,
                })
            )
        } else {
            dispatch(
                connectFailed('Failed to retrieve network information.')
            )
        }
    }
};


const providerRequest = () => {
    return {
        type: "PROVIDER_REQUEST",
    };
};

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    };
};

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    };
};