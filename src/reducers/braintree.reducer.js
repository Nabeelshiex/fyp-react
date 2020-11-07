import * as Actions from '../actions';

const initialState = {
    brainTreeClientToken: null,
    instance: null,
    isPaymentMethodModal: false,
    lineChartEarning: [],
    pieChartEarning: [],
    barChartEarning: [],
    numericEarning: {}
}

function braintreeReducer(state = initialState, action) {
    const data = action.payload;
    switch (action.type) {
        case Actions.GET_BRAIN_TREE_CLIENT_TOKEN:
            return state = {
                ...state,
                brainTreeClientToken: data
            }
        case Actions.SET_BRAINTREE_INSTANCE:
            return state = {
                ...state,
                instance: data
            }
        case Actions.TOGGLE_PAYMENT_METHOD_MODAL:
            if (state.isPaymentMethodModal) {
                return state = {
                    ...state,
                    isPaymentMethodModal: false
                }
            }
            return state = {
                ...state,
                isPaymentMethodModal: true
            }
        case Actions.GET_LINE_CHART_EARNING:
            return state = {
                ...state,
                lineChartEarning: [data.Jan, data.Feb, data.Mar, data.Apr, data.May, data.Jun, data.Jul, data.Aug, data.Sep, data.Oct, data.Nov, data.Dec]
            }
        case Actions.GET_PIE_CHART_EARNING:
            return state = {
                ...state,
                pieChartEarning: [data.Jan, data.Feb, data.Mar, data.Apr, data.May, data.Jun, data.Jul, data.Aug, data.Sep, data.Oct, data.Nov, data.Dec]
            }
        case Actions.GET_BAR_CHART_EARNING:
            return state = {
                ...state,
                barChartEarning: [data.Jan, data.Feb, data.Mar, data.Apr, data.May, data.Jun, data.Jul, data.Aug, data.Sep, data.Oct, data.Nov, data.Dec]
            }
        case Actions.NUMERIC_EARNING:
            return state = {
                ...state,
                numericEarning: data
            }
        default:
            return state;
    }
}

export default braintreeReducer;