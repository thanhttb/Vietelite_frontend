import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';

const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        'children': [
            {
                'path': 'index',
                'loadChildren': '.\/pages\/default\/blank\/blank.module#BlankModule',
            },
            {
                'path': 'students',
                'loadChildren': '.\/pages\/default\/students\/student.module#StudentModule',
            },
            {
                'path': 'enrolls',
                'loadChildren': '.\/pages\/default\/enrolls\/enrolls.module#EnrollsModule',
            },
            {
                'path': 'classes',
                'loadChildren': '.\/pages\/default\/classes\/classes.module#ClassesModule',
            },
            {
                'path': '',
                'redirectTo': 'index',
                'pathMatch': 'full',
            },
        ],
    },
    {
        'path': '**',
        'redirectTo': 'index',
        'pathMatch': 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeRoutingModule { }