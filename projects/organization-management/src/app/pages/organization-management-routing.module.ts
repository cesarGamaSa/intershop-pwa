import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeatureToggleGuard } from 'ish-core/feature-toggle.module';

import { FetchUsersGuard } from '../guards/fetch-users.guard';
import { RedirectFirstToParentGuard } from '../guards/redirect-first-to-parent.guard';

import { HierarchiesCreateGroupPageComponent } from './hierarchies-create-group/hierarchies-create-group-page.component';

/**
 * routes for the organization management
 *
 * visible for testing
 */
export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () => import('./users/users-page.module').then(m => m.UsersPageModule),
    canActivate: [FetchUsersGuard],
  },
  {
    path: 'users/create',
    loadChildren: () => import('./user-create/user-create-page.module').then(m => m.UserCreatePageModule),
    canActivate: [RedirectFirstToParentGuard],
  },
  {
    path: 'users/:B2BCustomerLogin',
    loadChildren: () => import('./user-detail/user-detail-page.module').then(m => m.UserDetailPageModule),
    canActivate: [FetchUsersGuard],
    data: {
      onlyInitialUsers: true,
    },
  },
  {
    path: 'users/:B2BCustomerLogin/profile',
    loadChildren: () =>
      import('./user-edit-profile/user-edit-profile-page.module').then(m => m.UserEditProfilePageModule),
    canActivate: [RedirectFirstToParentGuard],
  },
  {
    path: 'users/:B2BCustomerLogin/roles',
    loadChildren: () => import('./user-edit-roles/user-edit-roles-page.module').then(m => m.UserEditRolesPageModule),
    canActivate: [RedirectFirstToParentGuard],
  },
  {
    path: 'users/:B2BCustomerLogin/budget',
    loadChildren: () => import('./user-edit-budget/user-edit-budget-page.module').then(m => m.UserEditBudgetPageModule),
    canActivate: [RedirectFirstToParentGuard],
  },
  {
    path: 'hierarchies',
    loadChildren: () => import('./hierarchies/hierarchies-page.module').then(m => m.HierarchiesPageModule),
    canActivate: [FeatureToggleGuard],
    data: { feature: 'organizationHierarchies' },
  },
  {
    path: 'hierarchies/create-group',
    component: HierarchiesCreateGroupPageComponent,
    canActivate: [FeatureToggleGuard],
    data: { feature: 'organizationHierarchies' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationManagementRoutingModule { }
