import * as React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { TabPanel } from '../../../components/TabPanel';
/* import { HistoryTable } from '../../components/HistoryTable'; */
import { DepositHistoryTable } from '../../components/DepositHistoryTable';
import { WithdrawHistoryTable } from '../../components/WithdrawHistoryTable';

const WalletsHistory: React.FC = () => {
  const intl = useIntl();
  const { currency } = useParams<{ currency: string }>();
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const renderTabs = () => [
    {
      content: currentTabIndex === 0 ? <DepositHistoryTable currency={currency} type="deposits" /> : null,
      label: intl.formatMessage({ id: 'page.mobile.wallets.deposit.history' }),
    },
    {
      content: currentTabIndex === 1 ? <WithdrawHistoryTable currency={currency} type="withdraws" /> : null,
      label: intl.formatMessage({ id: 'page.mobile.wallets.withdraw.history' }),
    },
  ];

  return (
    <div className="pg-mobile-trading-tabs">
      <TabPanel panels={renderTabs()} currentTabIndex={currentTabIndex} onCurrentTabChange={setCurrentTabIndex} />
    </div>
  );
};

export { WalletsHistory };
