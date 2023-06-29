
export type filterPropsType = {
    description?: string;
    label?: string;
    language: string;
    category_id: number;
    tag_id?: number;
    author_id?: number;
    source_id?: number;
    end_date:string;
    start_date:string;
    onSearch: (paginatedArticle: any) => void;
};
