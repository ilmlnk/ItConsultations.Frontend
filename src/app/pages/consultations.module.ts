import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachesListPageComponent } from './consultations/coaches-list-page/coaches-list-page.component';
import { ConsultationsListPageComponent } from './consultations/consultations-list-page/consultations-list-page.component';
import { ConsultationsRoutingModule } from './consultations-routing.module';
import { RegisterPageComponent } from './consultations-administration/register-page/register-page.component';
import { LoginComponent } from './consultations-administration/login/login.component';
import { ConsultationsPageRootComponent } from './consultations/consultations-page-root/consultations-page-root.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CoachesListComponent } from './consultations/components/coaches-list/coaches-list.component';
import { ConsultationsListComponent } from './consultations/components/consultations-list/consultations-list.component';
import { ConsultationCardComponent } from './consultations/components/consultations-list/consultation-card/consultation-card.component';
import { ConsultationModalComponent } from './consultations/components/consultations-list/consultation-card/consultation-modal/consultation-modal.component';
import { ConsultationTimeModalComponent } from './consultations/components/consultations-list/consultation-card/consultation-modal/consultation-time-modal/consultation-time-modal.component';
import { SelectedOptionsComponent } from './consultations/components/consultations-list/consultation-card/consultation-modal/selected-options/selected-options.component';
import { ConsultationsTableComponent } from './consultations/components/consultations-table/consultations-table.component';
import { CalendarPageComponent } from './consultations/calendar-page/calendar-page.component';
import { FavoritesConsultationsPageComponent } from './consultations/favorites-consultations-page/favorites-consultations-page.component';
import { MeetingRecordingsPageComponent } from './consultations/meeting-recordings-page/meeting-recordings-page.component';
import { NotesPageComponent } from './consultations/notes-page/notes-page.component';
import { MessengerPageComponent } from './consultations/messenger-page/messenger-page.component';
import { MeetingsPageComponent } from './consultations/meetings-page/meetings-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AchievementsPageComponent } from './consultations/achievements-page/achievements-page.component';
import { NetworkPageComponent } from './consultations/network-page/network-page.component';
import { ForumPageComponent } from './consultations/forum-page/forum-page.component';
import { IndividualLessonsPageComponent } from './consultations/individual-lessons-page/individual-lessons-page.component';
import { HandbookPageComponent } from './consultations/handbook-page/handbook-page.component';
import { MeetingLinkWindowComponent } from './consultations/components/meeting-link-window/meeting-link-window.component';
import { StudentDashboardPageComponent } from './consultations/dashboard-page/student-dashboard-page.component';
import { RecentPeopleComponent } from './consultations/components/recent-people/recent-people.component';
import { DarkModeService } from '../shared/services/dark-mode/dark-mode.service';
import { RecentNotesComponent } from './consultations/dashboard-page/components/recent-notes/recent-notes.component';
import { PersonalizedAchievementsComponent } from './consultations/dashboard-page/components/personalized-achievements/personalized-achievements.component';
import { ToasterNotificationComponent } from '../shared/components/toaster-notification/toaster-notification.component';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageFlagPipe } from '../shared/pipes/language-flag.pipe';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { ModalWindowComponent } from '../shared/components/modal-window/modal-window.component';
import { LandingPageComponent } from './consultations/landing-page/landing-page.component';
import { HeroSectionComponent } from './consultations/components/landing/hero-section/hero-section.component';
import { ThreeParticlesComponent } from './consultations/components/three-particles/three-particles.component';
import { ThreeWarpLinesComponent } from './consultations/components/three-warp-lines/three-warp-lines.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoSectionComponent } from './consultations/components/landing/info-section/info-section.component';
import { CtaLandingSectionComponent } from './consultations/components/landing/cta-landing-section/cta-landing-section.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { AuthRootComponent } from './consultations-administration/auth-root/auth-root.component';
import { CoachDashboardPageComponent } from './consultations/coach-dashboard-page/coach-dashboard-page.component';
import { AdminDashboardPageComponent } from './consultations/admin-dashboard-page/admin-dashboard-page.component';
import { ApplyFormComponent } from './consultations-administration/apply-form/apply-form.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormFieldComponent } from '../shared/components/form-field/form-field.component';
import { FormFieldErrorComponent } from '../shared/components/form-field-error/form-field-error.component';
import { ReportProblemPageComponent } from './consultations/report-problem-page/report-problem-page.component';
import { DropdownModule } from "primeng/dropdown";
import { PartnersBlockComponent } from './consultations/components/landing/partners-block/partners-block.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UseCasesSectionComponent } from './consultations/components/landing/use-cases-section/use-cases-section.component';
import { CategoriesSectionComponent } from './consultations/components/landing/categories-section/categories-section.component';
import { ExpertsSectionComponent } from './consultations/components/landing/experts-section/experts-section.component';
import { RoadmapSectionComponent } from './consultations/components/landing/roadmap-section/roadmap-section.component';
import { WhyUsSectionComponent } from './consultations/components/landing/why-us-section/why-us-section.component';
import { CoachCtaSectionComponent } from './consultations/components/landing/coach-cta-section/coach-cta-section.component';
import { FeedbackSectionComponent } from './consultations/components/landing/feedback-section/feedback-section.component';
import { FaqSectionComponent } from './consultations/components/landing/faq-section/faq-section.component';
import { AccordionModule } from 'primeng/accordion';
import { LandingHeaderComponent } from './consultations/components/landing/landing-header/landing-header.component';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { DashboardPageHeaderComponent } from './consultations/components/dashboard/dashboard-page-header.component';
import { PaginatorComponent } from '../shared/components/paginator/paginator.component';
import { PaginatorModule } from 'primeng/paginator';
import {PageWrapperComponent} from '../shared/components/page-wrapper/page-wrapper.component';

@NgModule({
    declarations: [
        CoachesListPageComponent,
        ConsultationsListPageComponent,
        RegisterPageComponent,
        LoginComponent,
        ConsultationsPageRootComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        CoachesListComponent,
        ConsultationsListComponent,
        ConsultationCardComponent,
        ConsultationModalComponent,
        ConsultationTimeModalComponent,
        SelectedOptionsComponent,
        SelectedOptionsComponent,
        ConsultationsTableComponent,
        ConsultationsListComponent,
        CalendarPageComponent,
        FavoritesConsultationsPageComponent,
        MeetingRecordingsPageComponent,
        ConsultationsPageRootComponent,
        NotesPageComponent,
        MessengerPageComponent,
        MeetingsPageComponent,
        AchievementsPageComponent,
        NetworkPageComponent,
        ForumPageComponent,
        IndividualLessonsPageComponent,
        HandbookPageComponent,
        MeetingLinkWindowComponent,
        StudentDashboardPageComponent,
        RecentPeopleComponent,
        RecentNotesComponent,
        PersonalizedAchievementsComponent,
        ToasterNotificationComponent,
        ModalWindowComponent,
        LandingPageComponent,
        HeroSectionComponent,
        ThreeParticlesComponent,
        ThreeWarpLinesComponent,
        InfoSectionComponent,
        CtaLandingSectionComponent,
        AuthRootComponent,
        CoachDashboardPageComponent,
        AdminDashboardPageComponent,
        ApplyFormComponent,
        FormFieldComponent,
        FormFieldErrorComponent,
        ReportProblemPageComponent,
        PartnersBlockComponent,
        UseCasesSectionComponent,
        CategoriesSectionComponent,
        ExpertsSectionComponent,
        RoadmapSectionComponent,
        WhyUsSectionComponent,
        CoachCtaSectionComponent,
        FeedbackSectionComponent,
        FaqSectionComponent,
        LandingHeaderComponent,
        DashboardPageHeaderComponent,
        PaginatorComponent,
        PageWrapperComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ConsultationsRoutingModule,
        ReactiveFormsModule,
        ButtonsModule.forRoot(),
        BrowserAnimationsModule,
        BrowserAnimationsModule,
        BrowserModule,
        LanguageFlagPipe,
        TranslatePipe,
        FontAwesomeModule,
        PanelMenuModule,
        CardModule,
        SelectButtonModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        TableModule,
        ChipModule,
        AvatarModule,
        SelectModule,
        RadioButtonModule,
        DatePickerModule,
        PasswordModule,
        ProgressSpinnerModule,
        DropdownModule,
        OverlayPanelModule,
        AccordionModule,
        MenuModule,
        TooltipModule,
        PaginatorModule
    ],
  exports: [
    BrowserAnimationsModule,
  ],
  providers: [
    DarkModeService
  ]
})
export class ConsultationsModule { }
