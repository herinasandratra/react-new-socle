export type preferenceProps = {
    language: string;
    birthdate: string;
    author_id?:number;
    category_id?:number;
    source_id?:number;
    onChange?: (params: any) => void;
};
