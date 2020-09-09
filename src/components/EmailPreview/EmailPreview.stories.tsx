/* eslint-disable react/prop-types */
import React from 'react';
import faker from 'faker';

import { DeviceContext } from 'contexts/Device';

import Component, { Props as EmailPreviewProps } from './EmailPreview';

export default {
    title: 'Components/Invite',
    component: Component,
    argTypes: {
        DeviceType: {
            control: {
                type: 'select',
                options: ['desktop', 'mobile'],
            },
        },
        constituentScope: {
            control: {
                type: 'select',
                options: ['district', 'state'],
            },
        },
    },
};

interface Props extends EmailPreviewProps {
    DeviceType: 'desktop' | 'mobile';
}

export function EmailPreview({
    DeviceType,
    fName,
    MoC,
    topic,
    eventDateTime,
    constituentScope,
    registrationLink,
}: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <Component
                fName={fName}
                MoC={MoC}
                topic={topic}
                eventDateTime={eventDateTime}
                constituentScope={constituentScope}
                registrationLink={registrationLink}
            />
        </DeviceContext.Provider>
    );
}

EmailPreview.args = {
    DeviceType: 'desktop',
    fName: faker.name.firstName(),
    MoC: faker.name.firstName(),
    topic: 'Technology',
    eventDateTime: faker.date.future().toUTCString(),
    constituentScope: 'state',
    registrationLink: `https://connectingtocongress.org/invite/${faker.random.uuid()}`,
};