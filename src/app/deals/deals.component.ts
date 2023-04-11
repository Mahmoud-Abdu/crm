import { Component, ViewEncapsulation, OnInit, AfterViewChecked, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Deal } from './deal.model';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs/internal/Subscription';
 import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
 import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

 
export class DealsComponent implements OnInit, AfterViewChecked, OnDestroy {

  subscription!: Subscription;
  deals!:  Deal[];
  potentialValue!: Deal[];
  focus!: Deal[];
  contactMade!: Deal[];
  offerSent!: Deal[];
  gettingReady!: Deal[];
  isMobile: boolean = false;
  filterText: string = "";
  constructor(private ds: DataService, private responsive: BreakpointObserver) {}
 

  drop(event: CdkDragDrop<Deal[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.resetStatus('Potential Value', this.potentialValue);
      this.resetStatus('Focus', this.focus);
      this.resetStatus('Contact Made', this.contactMade);
      this.resetStatus('Offer Sent', this.offerSent);
      this.resetStatus('Getting Ready', this.gettingReady);


    }
  }
 
  async ngOnInit() {
    //detecting mobile view 
    this.responsive.observe(Breakpoints.HandsetLandscape)
    .subscribe(result => {
      if (result.matches) this.isMobile = true;
      else this.isMobile = false;
});
  
     this.subscription = this.ds.fetchData().subscribe((data: any) => {
         this.deals = data.deals;
         this.deals.forEach(deal => {
          let phone;
          phone = deal.phone.split('x')
          deal.phone = phone[0]
          });

         this.potentialValue = this.filtering(this.deals, 'Potential Value');
         this.focus = this.filtering(this.deals, 'Focus');
         this.contactMade = this.filtering(this.deals, 'Contact Made');
         this.offerSent = this.filtering(this.deals, 'Offer Sent');
         this.gettingReady = this.filtering(this.deals, 'Getting Ready');
        });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked() {
    // console.log('deals', this.deals)
  };

  filtering(deals:Array<Deal>, status: string ) {
     return deals.filter(deal => deal.status === status);
   };

   resetStatus(status: string, array:Deal[]) {
     let newlyAddedDeal = array.find(deal => deal.status != status);
     if(newlyAddedDeal) newlyAddedDeal.status = status;
   };

   addDeal() {
    this.focus.push({
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      status: '',
      date: '',
      probability_status: '',
      state: ''
    })
   }
}
