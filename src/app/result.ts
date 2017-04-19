interface Page<T> {
    pageIndex?: number
    pageStart?: number
    totalPage?: number
    totalCount?: number
    list?: Array<T>
}



interface Result<T> {
    code?: number
    doc?: T | Array<T> | Page<T> | any
    msg?: string
}

interface Result1 {
    code?: number
    doc?: any
    msg?: string
}

export {
    Result,
    Result1
}

// export declare type Result<T> = Result1<T> | Result2<T> | any
