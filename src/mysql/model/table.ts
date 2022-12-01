export type PrimaryKey = number;

export interface Table {
    id: PrimaryKey;
    createAt: Date;
    updateAt: Date;
}

export type PageNum = number;
export type PageSize = number;