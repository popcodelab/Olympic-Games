import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/charts',
    pathMatch: 'full'
  }, {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then(m => m.AboutModule)
      },{ path: '**', component: PageNotFoundComponent }
    ]
  },
  {
    path: '**', // wildcard
    component: PageNotFoundComponent
  },
];

/**
 * AppRoutingModule is a class that defines the routing configuration for the application.
 * It imports the RouterModule and sets up the routes using the RouterModule.forRoot() method.
 * The configured routes are then exported for use in other parts of the application.
 *
 * @remarks
 * This class is used in the main app module to enable routing within the application.
 *
 * @example
 * ```
 * import { NgModule } from '@angular/core';
 * import { RouterModule } from '@angular/router';
 * import { AppRoutingModule } from './app-routing.module';
 *
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot(routes, { useHash: true }),
 *     AppRoutingModule
 *   ],
 *   exports: [RouterModule]
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
  })],
  exports: [RouterModule],
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class AppRoutingModule {
}
