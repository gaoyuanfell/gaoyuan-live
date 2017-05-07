export interface Page<T> {
    pageIndex?: number
    pageSize?: number
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

export interface Id{
    state?: number
    createDate?: Date
    updateDate?: Date
}

export interface User extends Id{
    id?: number
    userDetailId?: number
    user?: string
    password?: string
    email?: string
    phone?: string
    nickName?: string
    url?: string
}

export interface Line extends Id{
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
    comments?: Page<Comment>
    branch?:Branch[]
}

export interface Img extends Id{
    width?:string
    height?:string
    url?:string
}

export interface Branch extends Id{
    id?: number
    user?: User
    line?: Line
    userId?: number
    lineId?: number
    title?: string
    introduce?: string
    url?: string
    urls?: string[]
    whs?: string[]
    imgs?:Img[]
    lng?: string
    lat?: string
    scope?: string
    praised?: number
    review?: number
    privacy?: number
    isPraised?: number
    comments?: Page<Comment>
}

export interface LineSend extends Id{
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

export interface Comment extends Id{
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
    replies?: Page<Reply>
}

export interface Reply extends Id{
    id?: number
    commentId?: number
    branchId?: number
    lineId?: number
    lineSendId?: number
    userId?: number
    userToId?: number
    context?: string
    praised?: number
}
