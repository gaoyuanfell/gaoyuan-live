import { Component, Input, AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const fadeInOut: AnimationEntryMetadata = trigger('fadeInOut', [
    // transition('void => *', [
    //     animate("0.2s ease-in", keyframes([
    //         style({ opacity: 0 })
    //     ]))
    // ]),
    // transition('* => void', [
    //     animate("0.2s ease-in", keyframes([
    //         style({ opacity: 1 }),
    //         style({ opacity: 0 })
    //     ]))
    // ])
    // state('in', style({ transform: 'translateX(0)' })),
    // transition('void => *', [
    //     style({ transform: 'translateX(-100%)' }),
    //     animate(100)
    // ]),
    // transition('* => void', [
    //     animate(100, style({ transform: 'translateX(100%)' }))
    // ])
    // state('inactive', style({ transform: 'translateX(0) scale(1)' })),
    // state('active', style({ transform: 'translateX(0) scale(1.1)' })),
    // transition('inactive => active', animate('100ms ease-in')),
    // transition('active => inactive', animate('100ms ease-out')),
    // transition('void => inactive', [
    //     style({ transform: 'translateX(-100%) scale(1)' }),
    //     animate(100)
    // ]),
    // transition('inactive => void', [
    //     animate(100, style({ transform: 'translateX(100%) scale(1)' }))
    // ]),
    // transition('void => active', [
    //     style({ transform: 'translateX(0) scale(0)' }),
    //     animate(200)
    // ]),
    // transition('active => void', [
    //     animate(200, style({ transform: 'translateX(0) scale(0)' }))
    // ])

    state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('void => *', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
    ]),
    transition('* => void', [
        animate('0.2s 10 ease-out', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
])
