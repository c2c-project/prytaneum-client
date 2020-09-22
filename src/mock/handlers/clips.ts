import { rest } from 'msw';
import faker from 'faker';

const makeNewClip = () => ({
    timeStamp: faker.random.number(100),
    duration: faker.random.number(100),
    title: faker.random.words(),
    user: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.random.words(),
    tags: new Array(5).fill(null).map( item => faker.random.word()),
});

const getClipList = () => [makeNewClip(), makeNewClip(), makeNewClip()];

export default [
    rest.get('/api/townhalls/:townhallId/clip/:clipId', (req, res, ctx) => {
        const { townhallId, clipId } = req.params as {
            townhallId: string;
            clipId: string;
        };
        if (townhallId === '0' || clipId === '0') return res(ctx.status(400));
        return res(
            ctx.json({
                clip: makeNewClip(),
            }),
            ctx.status(200)
        );
    }),

    rest.get('/api/townhalls/:townhallId/clip', (req, res, ctx) => {
        const {townhallId} = req.params as {townhallId: string};
        if (townhallId === '0') return res(ctx.status(400));
        return res(
            ctx.json({clips: getClipList(),
            }),
            ctx.status(200)
        );
    }),
];