import { Button, Result } from 'antd';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { injectIntl } from 'react-intl';
import { connect, useSelector } from 'react-redux';
import { airdropFetchId, AirdropState, selectAirdrop } from '../../../../modules/airdrops/airdrop';
import { claimFetchUserId, ClaimState, RootState, selectClaim, selectUserInfo } from '../../../../modules';
import * as actions from '../../../../modules/index';

import { LKTDetail } from './LKTDetail';
import { HNYDetail } from './HNYDetail';
import { VNDetail } from './VNDetail';
import { IDDetail } from './IDDetail';

export interface FacebookTabConfig {
    facebookAppId: string;
    facebookPage: string;
    facebookPost: string;
    disable: boolean;
}

export interface TwitterTabConfig {
    twitterName: string;
    twitterUserName: string;
    twitterPage: string;
    twitterPost: string;
    twitterPostId: string;
    disable: boolean;
}

export interface TelegramTabConfig {
    telegramGroup: string;
    telegramChannel: string;
    disable: boolean;
}

export interface TasksConfig {
    twitter: TwitterTabConfig,
    facebook: FacebookTabConfig,
    telegram: TelegramTabConfig
}

export interface AirdropDetailConfig {
    id: string;
    tasks: TasksConfig
}

interface ReduxProps {
    airdrops: AirdropState;
    claims: ClaimState;
}
interface DispatchProps {
    onFetchAirdrop: typeof airdropFetchId;
    onFetchClaimOfUser: typeof claimFetchUserId
}

type Props = ReduxProps & DispatchProps & AirdropDetailConfig;

const detailData: AirdropDetailConfig[] = [
    {
        id: '10',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/Lukutex_Indonesia',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'Lukutex Exchange',
                twitterUserName: 'Lukutex',
                twitterPage: 'https://twitter.com/Lukutex',
                twitterPost: 'https://twitter.com/Lukutex/status/1354165454483427329',
                twitterPostId: '1354165454483427329',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'http://www.facebook.com/lukutex',
                facebookPost: 'https://www.facebook.com/lukutex/posts/187940439694622',
                disable: false
            },
        }
    },
    {
        id: '2',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/rupiahtokenindonesia',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'Lukutex Exchange',
                twitterUserName: 'Lukutex',
                twitterPage: 'https://twitter.com/Lukutex',
                twitterPost: 'https://twitter.com/Lukutex/status/1328433753916489728',
                twitterPostId: '1328433753916489728',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'http://www.facebook.com/lukutex',
                facebookPost: 'https://www.facebook.com/lukutex/posts/148979510257382',
                disable: false
            },
        }
    },
    {
        id: '3',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/lukutex_office"',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'Lukutex Exchange',
                twitterUserName: 'Lukutex',
                twitterPage: 'https://twitter.com/Lukutex',
                twitterPost: 'https://twitter.com/Lukutex/status/1323957478493548545',
                twitterPostId: '1323957478493548545',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'http://www.facebook.com/lukutex',
                facebookPost: 'https://www.facebook.com/lukutex/posts/148979510257382',
                disable: false
            },
        }
    },
    {
        id: '4',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/ElasticToken',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'Elastic',
                twitterUserName: 'Elastic',
                twitterPage: 'https://twitter.com/CoinElastic',
                twitterPost: 'https://twitter.com/Lukutex/status/1329489404663001090',
                twitterPostId: '1329489404663001090',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'https://www.facebook.com/elasticcoin.org/',
                facebookPost: 'https://www.facebook.com/lukutex/posts/150263530128980',
                disable: false
            },
        }
    },
    {
        id: '6',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/shabushabufinance',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'shabufinance',
                twitterUserName: 'shabufinance',
                twitterPage: 'https://twitter.com/shabufinance',
                twitterPost: 'https://twitter.com/Lukutex/status/1331593962574864385',
                twitterPostId: '1331593962574864385',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'https://www.facebook.com/lukutex',
                facebookPost: 'https://www.facebook.com/lukutex/posts/155199949635338',
                disable: false
            },
        }
    },
    {
        id: '7',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/OrientProjectFinance',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'OrientProject',
                twitterUserName: 'OrientProject',
                twitterPage: 'https://twitter.com/OrientProject',
                twitterPost: 'https://twitter.com/Lukutex/status/1336578502804393985',
                twitterPostId: '1336578502804393985',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'https://www.facebook.com/orientproject.finance',
                facebookPost: 'https://www.facebook.com/lukutex/posts/165889855233014',
                disable: false
            },
        }
    },

    {
        id: '8',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/ElasticToken',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'Elastic',
                twitterUserName: 'CoinElastic',
                twitterPage: 'https://twitter.com/CoinElastic',
                twitterPost: 'https://twitter.com/Lukutex/status/1345585038188969984',
                twitterPostId: '1345585038188969984',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'https://www.facebook.com/lukutex',
                facebookPost: 'https://www.facebook.com/lukutex/posts/183687496786583',
                disable: false
            },
        }
    },

    {
        id: '9',
        tasks: {
            telegram: {
                telegramGroup: 'https://t.me/lukutex_office',
                telegramChannel: 'https://t.me/Lukutex_News',
                disable: false
            },
            twitter: {
                twitterName: 'Lukutex',
                twitterUserName: 'Lukutex',
                twitterPage: 'https://twitter.com/Lukutex',
                twitterPost: 'https://twitter.com/Lukutex/status/1349680646390575105',
                twitterPostId: '1349680646390575105',
                disable: false
            },
            facebook: {
                facebookAppId: '1243206966058196',
                facebookPage: 'https://www.facebook.com/lukutex',
                facebookPost: 'https://www.facebook.com/lukutex/posts/191553499333316',
                disable: false
            },
        }
    },

]

const Detail: React.FC<Props> = (props: Props) => {
    const { airdropID } = useParams<{ airdropID: string }>();
    const user = useSelector(selectUserInfo);

    React.useEffect(() => {
        props.onFetchAirdrop({
            id: airdropID
        });
        props.onFetchClaimOfUser({
            airdrop_id: airdropID,
            user_uid: user.uid
        });
    }, []);

    const detail: AirdropDetailConfig = detailData.find(detail => detail.id === airdropID)!;
    let detailScreen;
    if (detail !== undefined) {
        switch (airdropID) {
            case '10':
                detailScreen = <IDDetail detailConfig={detail} />;
                break;
            case '2':
                detailScreen = <LKTDetail detailConfig={detail} />;
                break;
            case '3':
                detailScreen = <LKTDetail detailConfig={detail} />;
                break;
            case '4':
                detailScreen = <LKTDetail detailConfig={detail} />;
                break;
            case '5':
                detailScreen = <LKTDetail detailConfig={detail} />;
                break;
            case '6':
                detailScreen = <LKTDetail detailConfig={detail} />;
                break;
            case '7':
                detailScreen = <LKTDetail detailConfig={detail} />;
                break;
            case '8':
                detailScreen = <HNYDetail detailConfig={detail} />;
                break;
            case '9':
                detailScreen = <VNDetail detailConfig={detail} />;
                break;
            default:
                detailScreen = <Result
                    status="error"
                    title="Page not exists!"
                    extra={[
                        <Button type="primary" href="/airdrop" key="console">
                            Go back Airdrop List
                        </Button>
                    ]}
                />
                break;
        }
    } else {
        detailScreen = <Result
            status="error"
            title="Page not exists!"
            extra={[
                <Button type="primary" href="/airdrop" key="console">
                    Go back Airdrop List
                        </Button>
            ]}
        />
    }

    return (
        <div className="container-fluid pl-3 pr-3">
            {detailScreen}
        </div>
    )
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    airdrops: selectAirdrop(state),
    claims: selectClaim(state)
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchAirdrop: (payload) => dispatch(actions.airdropFetchId(payload)),
        onFetchClaimOfUser: (payload) => dispatch(actions.claimFetchUserId(payload))
    };
};

export const AirdropDetail = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Detail as any)) as any;
