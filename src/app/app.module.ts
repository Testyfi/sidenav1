import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoupensComponent } from './coupens/coupens.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { AngularResizeEventModule } from 'angular-resize-event';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { QuestionviewerComponent } from './questionviewer/questionviewer.component';
import { CdTimerModule } from 'angular-cd-timer';
import { IntroductionComponent } from './introduction/introduction.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckoutpageComponent } from './checkoutpage/checkoutpage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MathjaxModule } from 'mathjax-angular';
import { ResultComponent } from './result/result.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { LivetestComponent } from './livetest/livetest.component';
import { AllcreatedtestComponent } from './allcreatedtest/allcreatedtest.component';
import { PaymentredirectComponent } from './paymentredirect/paymentredirect.component';
import { PasttestComponent } from './pasttest/pasttest.component';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    HeaderComponent,
    UserLoginComponent,
    QuestionviewerComponent,
    IntroductionComponent,
    CheckoutpageComponent,
    AboutusComponent,
    ResultComponent,
    AnalysisComponent,
    LivetestComponent,
    AllcreatedtestComponent,
    PaymentredirectComponent,
    PasttestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CdkMenuModule,
    OverlayModule,
    MatSlideToggleModule,
    MatCardModule,
    AngularResizeEventModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    BrowserModule,
    CanvasJSAngularChartsModule,
    MatProgressBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatProgressSpinnerModule,
    CdTimerModule,
    FontAwesomeModule,
    MathjaxModule.forRoot(),
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
