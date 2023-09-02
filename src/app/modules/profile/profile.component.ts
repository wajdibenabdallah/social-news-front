import { ProfileService } from './profile.service';
import { from, Observable } from 'rxjs';
import { PublicationService } from './publication/publication.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Publication } from 'src/app/shared/model/publication';
import { MatDialog } from '@angular/material/dialog';
import { NewPublicationComponent } from './modal/new-publication/new-publication.component';
import { User } from 'src/app/shared/model/user';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  publications$: Observable<Publication[]>;
  searchPublications$: Observable<Publication[]>;
  searchField: FormControl = new FormControl();
  searchForm = this.fb.group({ searchField: this.searchField });
  progress = false;
  user$: Observable<User>;

  constructor(
    private publicationService: PublicationService,
    private newPublicationModal: MatDialog,
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    // get user informations
    this.user$ = this.profileService.getCurrentUser();
    // get all publications
    this.publications$ = this.publicationService.fetch();
    // search publications
    this.searchPublications$ = this.searchField.valueChanges.pipe(
      tap(() => (this.progress = true)),
      debounceTime(1000),
      tap(() => (this.progress = false)),
      mergeMap((value: string) => {
        if (value !== '') {
          return this.publicationService.fetch({ title: value });
        } else {
          return from([]);
        }
      }),
    );
  }

  newPublication(): void {
    this.newPublicationModal.open(NewPublicationComponent, {
      width: '70%',
      height: '70%',
    });
  }

  reloadUserData(): void {
    this.user$ = this.profileService.getCurrentUser();
  }
}
