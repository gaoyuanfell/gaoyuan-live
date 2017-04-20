export interface Line {
    id?: number
    userId?: number
    title?: string
    introduce?: string
    praised?: number
    review?: number
    forward?: number
    privacy?: number
}

export interface Comment {
    id?: number
    branchId?: number
    lineId?: number
    userId?: number
    context?: string
    praised?: number
    review?: number
    forward?: number
    state?: number
    createDate?: Date
    updateDate?: Date
}
