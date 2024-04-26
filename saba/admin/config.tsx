import React from 'react'
import type { AdminConfig } from '@keystone-6/core/types';
import { CustomNavigation } from './components/CustomNavigation';

function CustomLogo() {
    return <h3>پنل کنترل پروژه صباپیشرو </h3>
}

export const components: AdminConfig['components'] = {
    Logo: CustomLogo,
    Navigation: CustomNavigation
};