import { combineReducers } from "redux"
import { findAllCustomerReducer, saveCustomerReducer, findCustomerByIdReducer, updateCustomerReducer } from "./customerReducer"
import {
  finAllTransactionReducer,
  findTransactionByIdReducer,
  saveTransactionReducer,
  updateTransactionReducer
} from "./transactionReducer";

const rootReducer = combineReducers({
  //CUSTOMER
  findAllCustomerReducer,
  saveCustomerReducer,
  findCustomerByIdReducer,
  updateCustomerReducer,

  //TRANSACTION
  finAllTransactionReducer,
  saveTransactionReducer,
  findTransactionByIdReducer,
  updateTransactionReducer

})

export default rootReducer