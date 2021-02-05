export interface Department {
    id?: string,
    name?: string,
    ename?: string
    code?: string,
    d1?: boolean
}
export interface Academic {
    id?: string,
    name?: string,
    ename?: string
    code?: string,
    logo?: string,
    color?: string,
    fcolor?: string,
    departments?: Department[]
}