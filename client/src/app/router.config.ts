import { Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { FeedComponent } from "./modules/feed/feed/feed.component";
import { PostComponent } from "./modules/post/post/post.component";
import { TopicComponent } from "./modules/topic/topic/topic.component";

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
        path: '**',
        redirectTo: ''
    }
]

export default routes;