import { all } from "redux-saga/effects";
import {
  watchFindAllCustomer,
  watchSaveCustomer,
  watchFindCustomerById,
  watchUpdateCustomer
} from "./customerSaga";
import {
  watchFindAllTransaction,
  watchFindTransactionById,
  watchSaveTransaction,
  watchUpdateTransactionById
} from "./transactionSaga";

export default function* rootSaga() {
  yield all([
    watchFindAllCustomer(),
    watchSaveCustomer(),
    watchUpdateCustomer(),
    watchFindCustomerById(),

    watchFindAllTransaction(),
    watchSaveTransaction(),

    watchFindTransactionById(),
    watchUpdateTransactionById
  ])
}