import { Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { Page401Component } from "./component/page401/page401.component";
import { Page404Component } from "./component/page404/page404.component";
import { FeedComponent } from "./modules/feed/feed/feed.component";
import { LabelsComponent } from "./modules/labels/labels.component";
import { PostEditorComponent } from "./modules/post/post-editor/post-editor.component";
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
        path: 'topic/:id',
        component: TopicComponent,
    },
    {
        path: 'post/:id',
        component: PostComponent
    },
    {
        path: 'post/:id/edit',
        component: PostEditorComponent
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
        path: '404',
        component: Page404Component
    },
    {
        path: '401',
        component: Page401Component
    },
    {
        path: 'sitemap',
        component: SitemapComponent
    },
    {
        path: 'labels',
        component: LabelsComponent
    },
    {
        path: '**',
        redirectTo: '404'
    }
]

export default routes;
