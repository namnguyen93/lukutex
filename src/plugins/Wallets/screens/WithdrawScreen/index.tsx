import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { setDocumentTitle } from '../../../../helpers';
import { allChildCurrenciesFetch, currenciesFetch, ethFeeFetch, fetchHistory, marketsFetch, resetHistory, selectChildCurrencies, selectCurrencies, selectETHFee, selectUserInfo, selectWallets, walletsChildCurrenciesFetch, walletsFetch } from '../../../../modules';
import { WithdrawAddress, WithdrawHistory, WithdrawInfo } from '../../containers';

export const WithdrawScreen = () => {
    setDocumentTitle('Withdraw');

    const { currency_id } = useParams<{ currency_id: string }>();

    // selectors
    const currencies = useSelector(selectCurrencies);
    const wallets = useSelector(selectWallets) || [];
    const user = useSelector(selectUserInfo);
    const eth_fee = useSelector(selectETHFee);
    const child_currencies = useSelector(selectChildCurrencies);

    const dispatch = useDispatch();
    const dispatchFetchCurrencies = () => dispatch(currenciesFetch());
    const dispatchFetchWallets = () => dispatch(walletsFetch());
    const dispatchFetchEthFee = () => dispatch(ethFeeFetch());
    const dispatchFetchChildCurrencies = () => dispatch(walletsChildCurrenciesFetch({ currency: currency_id }));
    const dispatchcFetchAllChildCurrencies = () => dispatch(allChildCurrenciesFetch());
    const dispatchFetchMarkets = () => dispatch(marketsFetch());
    const dispatchFetchHistories = () => dispatch(fetchHistory({ currency: currency_id, type: "withdraws", page: 1, limit: 6 }));
    const dispatchResetHistories = () => dispatch(resetHistory());

    const history = useHistory();

    // side effects
    React.useEffect(() => {
        dispatchFetchChildCurrencies();
        dispatchFetchMarkets();
        dispatchFetchCurrencies();
        dispatchFetchWallets();
        dispatchFetchEthFee();
        dispatchcFetchAllChildCurrencies();
        dispatchResetHistories();
        dispatchFetchHistories();
    }, [currency_id]);

    // method
    const findIcon = (currency_id: string): string => {
        const currency = currencies.find((currency: any) => currency.id === currency_id);
        try {
            return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${currency_id.toLowerCase()}.png`);
        } catch (err) {
            if (currency) return currency.icon_url;
            return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };

    return (
        <div className="container-fluid" style={{ position: "relative", padding: '20px 10% 20px 10%', marginTop: '-7px', backgroundColor: '#171c29', color: '#fff' }}>
            <div className="row" style={{ padding: '0 1rem' }}>
                <div className="col-6" style={{ backgroundColor: '#1E2841ff' }}>
                    <WithdrawInfo wallets={wallets} currency_id={currency_id.toLowerCase()} currency_icon={findIcon(currency_id)} />
                </div>
                <div className="col-6" style={{ backgroundColor: '#182034' }}>
                    <WithdrawAddress
                        user={user}
                        currency_id={currency_id.toLowerCase()}
                        wallets={wallets}
                        currencies={currencies}
                        eth_fee={eth_fee}
                        child_currencies={child_currencies}
                    />
                </div>
            </div>
            <div className="row" mt-5>
                <div className="col-12">
                    <WithdrawHistory currency_id={currency_id.toLowerCase()} />
                </div>
            </div>
            <div style={{ position: "fixed", top: '10%', left: '2rem' }}>
                <img style={{ cursor: "pointer" }} src="https://img.icons8.com/fluent/48/000000/circled-left.png" onClick={() => history.push({ pathname: '/new-wallets' })} alt="Back" />
            </div>
        </div>
    )
}
