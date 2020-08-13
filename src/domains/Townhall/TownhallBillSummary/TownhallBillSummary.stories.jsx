import React from 'react';
import Container from '@material-ui/core/Container';

import Component from './TownhallBillSummary';

export default { title: 'Domains/Townhall' };

const townhall = {
    billName: 'Darth Vader',
    moderator: 'Luke Skywalker',
    topic: 'Death Star Design & Imperial Unions',
    picture: 'https://i.imgur.com/3beQH5s.jpeg',
    readingMaterials: '',
    graphData: [
        {
            id: 'php',
            label: 'php',
            value: 344,
            color: 'hsl(312, 70%, 50%)',
        },
        {
            id: 'go',
            label: 'go',
            value: 262,
            color: 'hsl(244, 70%, 50%)',
        },
        {
            id: 'javascript',
            label: 'javascript',
            value: 411,
            color: 'hsl(320, 70%, 50%)',
        },
        {
            id: 'ruby',
            label: 'ruby',
            value: 191,
            color: 'hsl(305, 70%, 50%)',
        },
        {
            id: 'hack',
            label: 'hack',
            value: 234,
            color: 'hsl(230, 70%, 50%)',
        },
    ],
    date: new Date(),
};

export function TownhallBillSummary() {
    return (
        <Container maxWidth='sm' disableGutters>
            <Component townhall={townhall} />
        </Container>
    );
}
