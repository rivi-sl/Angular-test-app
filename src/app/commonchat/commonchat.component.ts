import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commonchat',
  templateUrl: './commonchat.component.html',
  styleUrls: ['./commonchat.component.css']
})
export class CommonchatComponent implements OnInit {
  title = "Common Chat"

  constructor() { }

  ngOnInit(): void {
  }

}
