import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalchat',
  templateUrl: './globalchat.component.html',
  styleUrls: ['./globalchat.component.css']
})
export class GlobalchatComponent implements OnInit {
  title = "Global Chat"

  constructor() { }

  ngOnInit(): void {
  }

}
