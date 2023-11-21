import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { CoupensComponent } from './coupens/coupens.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProductsComponent } from './products/products.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { QuestionviewerComponent } from './questionviewer/questionviewer.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { CheckoutpageComponent } from './checkoutpage/checkoutpage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ResultComponent } from './result/result.component';
import { AnalysisComponent } from './analysis/analysis.component';
const routes: Routes = [
  { path: '', redirectTo: 'introduction', pathMatch: 'full' },
  { path: 'introduction', component: IntroductionComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'coupens', component: CoupensComponent },
  { path: 'pages', component: PagesComponent },
  { path: 'media', component: MediaComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'questionviewer', component: QuestionviewerComponent },
  { path: 'checkoutpage', component: CheckoutpageComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'result', component: ResultComponent },
  { path: 'analysis', component: AnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
