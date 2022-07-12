const initialState = {
    loading: false,
    ethers: null,
    errorMsg: ""
};

const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PROVIDER_REQUEST":
            return {
                ...initialState,
                loading: true,
            };
        case "CONNECTION_SUCCESS":
            return {
                ...state,
                loading: false,
                ethers: action.payload.ethers,
            };
        case "CONNECTION_FAILED":
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload,
            };
        default:
            return state;
    }
};

export default blockchainReducer;

