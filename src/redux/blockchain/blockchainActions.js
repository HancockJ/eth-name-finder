import {ethers} from "ethers";

export const connectProvider = () => {
    console.log("Connecting to provider...")
    return async (dispatch) => {
        dispatch(providerRequest());
        let provider = ethers.getDefaultProvider('ropsten');
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