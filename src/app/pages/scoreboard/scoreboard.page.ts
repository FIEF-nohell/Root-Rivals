import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.getObs()
  }

  getObs(){
    this.statsService.observableScoreboard().subscribe((list) => {
      console.log("list: ")
      list.forEach((element: any) => {
        console.log(element.data())
      });
    })
  }

}
