import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privatechat-id',
  templateUrl: './privatechat-id.component.html',
  styleUrls: ['./privatechat-id.component.css']
})
export class PrivatechatIDComponent implements OnInit {

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; 
    });
    const id = +this.route.snapshot.paramMap.get('id');
  // this.heroService.getHero(id)
  //   .subscribe(hero => this.hero = hero);
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
