import { User } from "./user";

export class Post {
    id?: number;
    thumbnail_url: string
    slug?: string
    title: string;
    user: User;
    published_at: Date;
    description: string;
    content: string;
    postable_type: string;
}
