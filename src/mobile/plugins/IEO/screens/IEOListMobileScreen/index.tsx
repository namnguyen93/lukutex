import * as React from 'react';
import { SaleListTables } from '../../containers';
import './IEOListMobileScreen.css';
export const IEOListMobileScreen: React.FC = () => {
    return (
        <React.Fragment>
            <div style={{ position: 'relative' }}>
                <img
                    style={{ width: '100%', margin: 0 }}
                    src="https://i.imgur.com/BVEzar1.png" alt="ieo_banner" />

            </div>
            <div className="d-flex flex-row">
                <a className="flex-fill text-center" href="https://form.jotform.com/203166968415058" target="_blank" style={{ backgroundColor: '#457b9d', color: '#fff' }}>Apply to Launch</a>
                <a className="flex-fill text-center" href="https://form.jotform.com/20316696841505" target="_blank" style={{ backgroundColor: '#2a9d8f', color: '#fff' }}>Open Trade Token</a>
            </div>

            <div id="sale-list-mobile" className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="sale-list-mobile__title">Welcome to Lukutex Launchpad!</h1>
                        <h2 className="sale-list-mobile__subtitle">The starting point for the most promising projects the cryptocurrency space has to offer.</h2>
                    </div>
                </div>
                <div className="mt-3">
                    <SaleListTables />
                </div>
            </div>
        </React.Fragment>
    )
}
