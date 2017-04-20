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
