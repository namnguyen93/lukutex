import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { DepositAddress, DepositHistory, DepositInfo } from '../../containers';
import { setDocumentTitle } from '../../helpers';
import {
  allChildCurrenciesFetch,
  beneficiariesFetch,
  currenciesFetch,
  Currency,
  fetchHistory,
  marketsFetch,
  selectChildCurrencies,
  selectCurrencies,
  selectWallets,
  walletsChildCurrenciesFetch,
  walletsFetch,
} from '../../modules';

export const DepositScreen = () => {
  setDocumentTitle('Deposit');
  const { currency_id } = useParams<{ currency_id: string }>();

  const [selectedCurrencyID, setSelectedCurrencyID] = React.useState('');

  // selectors
  const currencies = useSelector(selectCurrencies);
  const wallets = useSelector(selectWallets) || [];
  const childCurrencies = useSelector(selectChildCurrencies);
  const dispatch = useDispatch();
  const dispatchFetchCurrencies = () => dispatch(currenciesFetch());
  const dispatchFetchWallets = () => dispatch(walletsFetch());
  const dispatchFetchChildCurrencies = () => dispatch(walletsChildCurrenciesFetch({ currency: currency_id }));
  const dispatchFetchAllChildCurrencies = () => dispatch(allChildCurrenciesFetch());
  const dispatchFetchMarkets = () => dispatch(marketsFetch());
  const dispatchFetchHistories = () => dispatch(fetchHistory({ currency: currency_id, type: 'deposits', page: 0, limit: 6 }));
  const dispatchFetchBeneficiaries = () => dispatch(beneficiariesFetch());

  const history = useHistory();

  // method
  const findIcon = (currencyID: string): string => {
    // tslint:disable-next-line:no-shadowed-variable
    const currency = currencies.find((currency: Currency) => currency.id === currencyID);
    try {
      return require(`../../../node_modules/cryptocurrency-icons/128/color/${currencyID.toLowerCase()}.png`);
    } catch (err) {
      if (currency) {
        return currency.icon_url;
      }

      return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
    }
  };

  // side effects
  React.useEffect(() => {
    dispatchFetchChildCurrencies();
    dispatchFetchMarkets();
    dispatchFetchCurrencies();
    dispatchFetchWallets();
    dispatchFetchChildCurrencies();
    dispatchFetchAllChildCurrencies();
    dispatchFetchHistories();
    dispatchFetchBeneficiaries();
  }, [currency_id]);

  return (
    <div
      className="container-fluid"
      style={{
        position: 'relative',
        padding: '20px 6% 20px 6%',
        marginTop: '-7px',
        backgroundColor: 'var(--main-background-color)',
        color: '#fff',
      }}
    >
      <div className="row" style={{ padding: '0 1rem' }}>
        <div className="col-6" style={{ padding: '20px 2%' }}>
          <DepositInfo
            currency_id={currency_id}
            selectedCurrencyID={selectedCurrencyID ? selectedCurrencyID : currency_id}
            currency_icon={findIcon(currency_id.toLowerCase())}
            changeCurrency={setSelectedCurrencyID}
            wallets={wallets}
          />
        </div>
        <div className="col-6" style={{ margin: '40px 0' }}>
          <DepositAddress
            currency_id={currency_id}
            selectedCurrencyID={selectedCurrencyID ? selectedCurrencyID : currency_id}
            changeCurrency={setSelectedCurrencyID}
            currencyIcon={findIcon(currency_id.toLowerCase())}
            childCurrencies={childCurrencies}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <DepositHistory currency_id={currency_id} />
        </div>
      </div>
      <div style={{ position: 'fixed', top: '10%', left: '2rem' }}>
        <img
          style={{ cursor: 'pointer' }}
          src="https://img.icons8.com/fluent/48/000000/circled-left.png"
          onClick={() => history.push({ pathname: '/wallets' })}
          alt="Back"
        />
      </div>
    </div>
  );
};
