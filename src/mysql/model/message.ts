import { Table } from "./table";

export interface Message extends Table {
    // id: number;
    title: string;
    content: string;
    channel: number;
    // createAt: Date;
}