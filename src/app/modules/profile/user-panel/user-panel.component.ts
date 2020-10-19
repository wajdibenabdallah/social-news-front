import { UserSettingsComponent } from '../modal/user-settings/user-settings.component';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  @Input() user$: Observable<User>;
  @Output() updateUserEvent = new EventEmitter();
  bio: string;
  constructor(private authGuard: AuthGuardService, private settingsModal: MatDialog) {}

  ngOnInit(): void {
    this.bio = `Ingénieur Informaticien diplômé depuis 2015 de l‘Institut Supérieur de Sciences Appliquées et de Technologie de
    Sousse, occupant le poste d'un consultant FullStack js chez Synopsia. Je suis en recherche permanente de nouveaux
    challenges, et intéressé à savoir et découvrir l'évolution de l'informatique. Au-delà des technologies, j’accorde
    une immense importance à mon environnement et mon cadre de travail (valeurs, communication, partage, rigueur,
    ambiance,…). Mes compétences évoluent au rythme des évolutions technologiques et méthodologiques.`;
  }

  settings(): void {
    this.settingsModal
      .open(UserSettingsComponent, {
        width: '600px',
        height: '500px',
        data: this.user$,
        disableClose: true,
      })
      .componentInstance.updateUserEvent.subscribe((user: User) => {
        this.updateUserEvent.emit(user);
      });
  }

  closeModal(): void {
    console.log('closeModal');
  }

  logout(): void {
    this.authGuard.logout();
  }
}
