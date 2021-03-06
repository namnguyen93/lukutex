import { put } from 'redux-saga/effects';
// import { API, RequestOptions } from '../../../../../api';
import api from '../../../../plugins/api';

import {
    ETHFeeWithdraw,
    ethFeeWithdrawError,
} from '../actions';
import { ETHFeeWithdraws } from '../types';

export function* withdrawByEthFee(action: ETHFeeWithdraw) {
    try {
        yield api.post<ETHFeeWithdraws>('eth-withdraw', action.payload);
    } catch (error) {
        yield put(ethFeeWithdrawError(error));
    }
}