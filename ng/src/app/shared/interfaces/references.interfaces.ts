import { Category } from './category.interfaces';

export interface Reference {
    Id: number;
    Title: string;
    Description: string;
    PreviewImage: string;
    UrlPath: string;
    Category: Array<Category>;
    Links: string;
    CreateDate: string;
    ShortDescription: string;
    Customer: string;
    Responsible: string;
}
