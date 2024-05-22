import React from 'react'
import type { AdminConfig } from '@keystone-6/core/types';
import { CustomNavigation } from './components/CustomNavigation';
const logo = require('./public/static/saba.png').default.src

function CustomLogo() {
    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            gap: 4
        }} >

            <img width={'82px'} src={logo} />
            <h3>پنل کنتل پروژه</h3>
        </div>
    )

}

export const components: AdminConfig['components'] = {
    Logo: CustomLogo,
    Navigation: CustomNavigation
};