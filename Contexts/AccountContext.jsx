import React from "react";

const AccountStateContext = React.createContext();
const AccountDispatchContext = React.createContext();

const initialState = {
    user: undefined,
    password: undefined,
    name: undefined,
    id: undefined,
}

function accountReducer(state, action) {
    switch(action.type) {
        case 'set-user':
            return {
                ...state,
                user: action.value,
            }
        case 'set-password':
            return {
                ...state,
                password: action.value,
            }
        default:
            return state;
    }
}

function AccountProvider({children}) {
    const [state, dispatch] = React.useReducer(accountReducer, {
        ...initialState,
    });

    return(
        <AccountStateContext.Provider value={state}>
            <AccountDispatchContext.Provider value={dispatch}>
                {children}
            </AccountDispatchContext.Provider>
        </AccountStateContext.Provider>
    )
}

function useAccountState() {
    const context = React.useContext(AccountStateContext);
    if(context === undefined) {
       console.log('useAccountState must be used within a AccountProvider');
    }

    return context;
}

function useAccountDispatch() {
    const context = React.useContext(AccountDispatchContext);
    if(context === undefined) {
        console.log('useAccountDispatch must be used within a AccountProvider');
    }

    return context;
}

function useAccountFunctions() {
    const dispatch = useAccountDispatch();

    return {
        updateAccountUser: user => {
            dispatch({type: 'set-user', value: standalizeUser(user)})
        },
        updateAccountPassword: password => {
            dispatch({type: 'set-password', value: password})
        }
    }
}

export {
    AccountProvider,
    useAccountState,
    useAccountDispatch,
    useAccountFunctions
};

function standalizeUser(user) {
    return {
        ...user,
    }
}