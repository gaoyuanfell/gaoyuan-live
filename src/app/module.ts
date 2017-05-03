export interface Page<T> {
    pageIndex?: number
    pageStart?: number
    totalPage?: number
    totalCount?: number
    list?: T[]
}

export interface Result<T> {
    code?: number
    doc?: T
    msg?: string
}

export interface User {
    id?: number
    userDetailId?: number
    user?: string
    password?: string
    email?: string
    phone?: string
    nickName?: string
}

export interface Line {
    id?: number
    user?: User
    userId?: number
    title?: string
    introduce?: string
    praised?: number
    review?: number
    forward?: number
    privacy?: number
    isPraised?: number
    isForward?: number
    comments?: Comment[]
}

export interface Branch {
    id?: number
    user?: User
    line?: Line
    userId?: number
    lineId?: number
    title?: string
    introduce?: string
    url?: string
    urls?: string[]
    lng?: string
    lat?: string
    scope?: string
    praised?: number
    review?: number
    privacy?: number
    isPraised?: number
    comments?: Comment[]
}

export interface LineSend {
    id?: number
    lineId?: number
    line?: Line
    user?: User
    userId?: number
    title?: string
    context?: string
    introduce?: string
    praised?: number
    review?: number
    forward?: number
    privacy?: number
    isPraised?: number
    isForward?: number
    sort?: number
    comments?: Comment[]
}

export interface Comment {
    id?: number
    branchId?: number
    lineId?: number
    line?: Line
    userId?: number
    user?: User
    context?: string
    praised?: number
    review?: number
    forward?: number
    state?: number
    createDate?: Date
    updateDate?: Date
    replies?: Page<Reply>
}

export interface Reply {
    id?: number
    commentId?: number
    branchId?: number
    lineId?: number
    lineSendId?: number
    userId?: number
    userToId?: number
    context?: string
    praised?: number
    state?: number
    createDate?: Date
    updateDate?: Date
}
