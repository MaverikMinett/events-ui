import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDetailPage } from './components/events-detail-page/events-detail.page';
import { EventsListPage } from './components/events-list-page/events-list.page';
import { EventsRegistrationPage } from './components/events-registration-page/events-registration.page';

const routes: Routes = [
    { path: 'events', component: EventsListPage },
    { path: 'events/:id', component: EventsDetailPage },
    { path: 'events/:id/register', component: EventsRegistrationPage }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
