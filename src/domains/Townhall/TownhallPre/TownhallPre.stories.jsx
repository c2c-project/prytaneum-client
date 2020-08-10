import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';

export default { title: 'Domains/Townhall' };

const townhall = {
    speaker: {
        name: 'Darth Vader',
        party: 'Dark Side',
        territory: 'CA-41',
    },
    moderator: 'Luke Skywalker',
    topic: 'Death Star Design & Imperial Unions',
    picture: 'https://i.imgur.com/3beQH5s.jpeg',
    readingMaterials: '',
    date: new Date(),
    alignment: 'Dark Side',
};

export function TownhallPre() {
    return (
        <Container
            maxWidth='sm'
            style={{ height: '100%', width: '100%', padding: '0' }}
        >
            <Component townhall={townhall} />
        </Container>
    );
}
