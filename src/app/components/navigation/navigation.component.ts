import { Component, AfterContentChecked } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../pages/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from '../search/search.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'personal-manager-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements AfterContentChecked {
  pageTitle = 'Personal Manager';
  isHandset: boolean;
  isTablet: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => { this.isHandset = result.matches; return result.matches; }),
      shareReplay()
    );

    isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
    .pipe(
      map((result) => { this.isTablet = result.matches; return result.matches; }),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public _authService: AuthService,
    private _appService: AppService,
    private _dialog: MatDialog) {
    // console.log(history.state);
  }

  ngAfterContentChecked() {
    this.pageTitle = history.state.title || 'Personal Manager';
  }

  onNavbarButtonClick(param) {
    // console.log('onNavbarButtonClick param: ', param);
    let dialogRef = this._dialog.open(SearchComponent, {
      width: '90%',
      /* data: {
        title: 'Delete?',
        message: 'Are you sure you want to delete this grocery record?',
        okayText: 'Yes',
        cancelText: 'No'
      } */
    });
    
    dialogRef.afterClosed().subscribe((response) => {
      this._appService.dialogRef.emit({ path: window.location.pathname, action: param, data: response });
    });
  }

}
