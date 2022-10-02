import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Contest } from "src/app/models/contest";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-contest-user-join",
  templateUrl: "./contest-user-join.component.html",
  styleUrls: ["./contest-user-join.component.css"],
})
export class ContestUserJoinComponent implements OnInit {
  listContestByUser: Array<Contest>;
  statusListContests: boolean = false;
  valueStatus: number;
  keyword: string;

  constructor(private usersService: UserService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("Các cuộc thi đã tham gia");
    this.getAllContestByUser();
  }

  // Locj theo trạng thái cuộc thi
  filterWhereStatus(event: any) {
    this.statusListContests = false;
    this.valueStatus = event.target.value;
    this.valueStatus > 0 ? this.filterContest("", this.valueStatus) : this.getAllContestByUser();
  }

  //  Tìm kiếm cuộc thi
  filterContestSearch() {
    console.log(this.valueStatus);

    this.statusListContests = false;
    let keyword = this.keyword;
    this.filterContest(keyword, this.valueStatus);
  }

  setValueSearch(event: any) {
    this.keyword = event.target.value;
  }

  // Dungf chung chung cho chức năng lọc
  filterContest(keyWord: string, valueStatus: any) {
    this.usersService.getContestByUserStatus(keyWord, valueStatus).subscribe((res) => {
      if (res.status) this.listContestByUser = res.payload.data;
      if (this.listContestByUser) this.statusListContests = true;
    });
  }

  // Gọi tất cả các cuộc thi theo user
  getAllContestByUser() {
    this.filterContest("", "");
  }
}
