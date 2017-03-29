import { animate, state, style, transition, trigger } from '@angular/core';

export const ease = trigger('ease',[
    state('hidden',style({
        opacity:0
    })),
    state('visible',style({
        opacity: 1
    })),
    transition('visible => hidden', animate('400ms ease-in')),
    transition('hidden => visible', animate('400ms ease-out'))
])