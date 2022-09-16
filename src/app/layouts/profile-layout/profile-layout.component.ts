import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-profile-layout",
  templateUrl: "./profile-layout.component.html",
  styleUrls: ["./profile-layout.component.css"],
})
export class ProfileLayoutComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    this.userService.user.subscribe((data) => {
      this.user = data!;
      return;
    });

    this.user = this.userService.getUserValue();
  }
}
