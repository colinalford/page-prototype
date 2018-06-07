import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { ActionBarComponent } from './action-bar';
import { AsideComponent } from './aside';
import { FilterDrawerComponent } from './filter-drawer';
import { FiltersComponent } from './filters';
import { LayoutComponent } from './layout';
import { MainComponent } from './main';
import { ResourcesComponent } from './resources';
import { DataStore, initial } from '../model/store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ActionBarComponent,
    AsideComponent,
    FilterDrawerComponent,
    FiltersComponent,
    LayoutComponent,
    MainComponent,
    ResourcesComponent
  ],
  exports: [
    ActionBarComponent,
    AsideComponent,
    FilterDrawerComponent,
    FiltersComponent,
    LayoutComponent,
    MainComponent,
    ResourcesComponent
  ],
  providers: [ { provide: DataStore, useValue: initial }]
})
export class ComponentsModule {}
