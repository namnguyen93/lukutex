import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { SaleInfo, SaleBuy, SaleSocial, SaleDetail, BuyersHistory, BuyHistory } from '../../containers';
import './SaleDetailScreen.css';
import { findSalebyId, selectSaleItem, selectUserInfo } from '../../../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Result, Row, Spin } from 'antd';

export const SaleDetailScreen: React.FC = () => {
    const history = useHistory();
    const { ieoID } = useParams<{ ieoID: string }>();
    const saleItem = useSelector(selectSaleItem);
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const dispatchFetchSaleItemByID = (ieoID) => dispatch(findSalebyId({
        id: ieoID
    }));

    React.useEffect(() => {
        dispatchFetchSaleItemByID(ieoID);
    }, []);

    let saleInfoView, saleBuyView, saleSocialView, saleDetailView, buyHistoryView;
    if (saleItem && user) {
        saleInfoView = <SaleInfo ieoID={ieoID} sale={saleItem.payload} />;
        saleBuyView = <SaleBuy uid={user.uid} sale={saleItem.payload} />;
        saleDetailView = <SaleDetail ieoID={Number(saleItem.payload.id)} />;
        if (user.uid) {
            buyHistoryView =
                <>
                    <div className="col-md-12 col-xl-6 mt-3">
                        <BuyHistory uid={user.uid} ieoID={Number(saleItem.payload.id)} />
                    </div>
                    <div className="col-md-12 col-xl-6 mt-3">
                        <BuyersHistory ieoID={Number(saleItem.payload.id)} />
                    </div>
                </>
        } else {
            buyHistoryView =
                <>
                    <div className="col-12">
                        <BuyersHistory ieoID={Number(saleItem.payload.id)} />
                    </div>
                </>
        }



        const saleSocial = saleItem.payload.social;
        saleSocialView =
            <SaleSocial
                website={saleSocial.website}
                whitepaper={saleSocial.whitepaper}
                ico={saleSocial.ico}
                facebook={saleSocial.facebook}
                telegram={saleSocial.telegram}
                twitter={saleSocial.twitter}
                linkedin={saleSocial.linkedin}
                instagram={saleSocial.instagram}
            />;
    }

    const getBadgeColor = (type) => {
        switch (type) {
            case 'ongoing':
                return '#2a9d8f'
            case 'upcoming':
                return '#e9c46a';
            case 'ended':
                return '#e63946';
            default:
                return '#0C9D58ff';
        }
    }

    const renderDetailScreenView = () => {
        if (saleItem.loading) {
            return (
                <div className="spin-center"><Spin size="large" /></div>
            );
        } else if (!saleItem.payload.id) {
            return (
                <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong. Not found IEO"
                    extra={<Button type="primary" onClick={() => history.goBack()}>Go Back</Button>}
                />
            );
        }
        else {
            return (
                <div id="sale-detail-screen">
                    <div id="sale-info-buy" className="container-fluid">
                        <span className="sale-detail__badge" style={{ backgroundColor: getBadgeColor(saleItem.payload.type) }}>{saleItem.payload ? saleItem.payload.type : ''}</span>
                        <Row gutter={[16, 16]}>
                            <Col span={16}>{saleInfoView}</Col>
                            <Col  span={8}>{saleBuyView}</Col>
                        </Row>
                       
                    </div>

                    <div id="sale-history" className="container-fluid">
                        <div className="row">
                            {buyHistoryView}
                        </div>
                    </div>
                    <div id="sale-social" className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {saleSocialView}
                            </div>
                        </div>
                    </div>
                    <div id="sale-detail" className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {saleDetailView}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            {renderDetailScreenView()}
        </React.Fragment>
    )
}
