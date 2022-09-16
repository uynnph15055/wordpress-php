import { User } from "./user";

export class Post {
    thumbnail_url: string
    slug?: string
    title: string;
    user: User;
    published_at: Date;
    description: string;
    content: string;
    slug: string;
    postable_type: string;
}
