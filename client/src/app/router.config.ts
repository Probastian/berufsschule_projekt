import { Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { FeedComponent } from "./modules/feed/feed/feed.component";
import { PostComponent } from "./modules/post/post/post.component";
import { SitemapComponent } from "./modules/sitemap/sitemap.component";
import { TopicComponent } from "./modules/topic/topic/topic.component";
import { TopicsComponent } from "./modules/topics/topics.component";
import { UserComponent } from "./modules/user/user.component";


const routes: Routes = [
    {
        path: '',
        component: FeedComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'topic',
        component: TopicComponent
    },
    {
        path: 'post', 
        component: PostComponent
    },
    {
        path: 'topics',
        component: TopicsComponent
    },
    {
        path: 'user', 
        component: UserComponent
    },
    {
        path: 'sitemap', 
        component: SitemapComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

export default routes;