import { Component, Input, AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const fadeInLOutR: AnimationEntryMetadata = trigger('fadeInLOutR', [
    state('in', style({ transform: 'translateX(100%)' })),
    transition('void => *', [
        animate("0.2s ease-in", keyframes([
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
    ]),
    transition('* => void', [
        animate("0.2s ease-in", keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
    ])
])
