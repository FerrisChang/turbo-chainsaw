export interface DB_Country {
    name: string;
    isoCode: string;
    selected: boolean;
    color: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
} 