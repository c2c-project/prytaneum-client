import React from 'react';
import Component from './Progress';


export default { title: 'Components' };
const progress = {
    progressData: [
        {
            value: 0,
            label: 'Introduced',
        },
        {
            value: 50,
            label: 'Passed in houses',
        },
    
        {
            value: 100,
            label: "Became Law",
        },
        
    ],
    defaultVal: 0
};

export function Progress() {
    return <Component progress={progress} />;
}
