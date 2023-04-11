import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Deal } from '../deals/deal.model';
import { Observable, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  deals!: Deal[] | any;
  newClients!: Number;
  isMobile = false;

  constructor(
    private ds: DataService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit() {
    //detecting mobile view
    this.responsive
      .observe(Breakpoints.HandsetLandscape)
      .subscribe((result) => {
        if (result.matches) this.isMobile = true;
        else this.isMobile = false;
      });

    this.subscription = this.ds.fetchData().subscribe((data: any) => {
      this.deals = data.deals;
      this.newClients = this.deals.filter(
        (client: Deal) => client.state === 'New').length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
