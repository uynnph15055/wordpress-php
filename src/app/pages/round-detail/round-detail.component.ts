import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent implements OnInit {

  roundDetail: any = [
    {
      "id": 4,
      "name": "Georgette Crooks II",
      "image": "https://ephoto360.com/uploads/worigin/media/logo-avatar-ephoto360/thumb/bg-wolf.jpg",
      "start_time": "2022-03-02 04:30:29",
      "end_time": "2022-03-02 04:30:29",
      "description": "Dignissimos error error molestias impedit nihil eius aut laboriosam voluptatum harum animi sequi.",
      "contest_id": 2,
      "created_at": "2022-03-02T04:30:31.000000Z",
      "updated_at": "2022-03-02T04:30:31.000000Z",
      "type_exam_id": 7,
      "contest": {
        "id": 2,
        "name": "binh boongv",
        "img": "6246cbe6183b8-1648806886_img.jpg",
        "date_start": "2022-04-01 17:29:33",
        "register_deadline": "2022-04-10 04:29:33",
        "description": "Cupiditate aperiam iure molestiae et facere aspernatur consequatur id odio asperiores ea voluptates sapiente et perspiciatis aut aut optio beatae.",
        "major_id": 6,
        "status": 1,
        "created_at": "2022-03-02T04:29:33.000000Z",
        "updated_at": "2022-04-01T09:54:48.000000Z",
        "teams": [
          {
            "id": 145,
            "name": "Mr. Manuel Nolan",
            "image": "https://i.pinimg.com/originals/6a/54/2a/6a542ae20b05d5129568fd49e03adb16.jpg",
            "contest_id": 2,
            "created_at": "2022-04-01T06:50:06.000000Z",
            "updated_at": "2022-04-01T06:50:06.000000Z",
            "members": [
              {
                "id": 45,
                "name": "Hosea Crona",
                "email": "quitzon.maurice@example.com",
                "created_at": "2022-03-03T05:51:09.000000Z",
                "updated_at": "2022-03-03T05:51:09.000000Z",
                "avatar": "https://via.placeholder.com/640x480.png/006633?text=avatar+in",
                "status": 1,
                "pivot": {
                  "team_id": 145,
                  "user_id": 45
                }
              },
              {
                "id": 45,
                "name": "Hosea Crona",
                "email": "quitzon.maurice@example.com",
                "created_at": "2022-03-03T05:51:09.000000Z",
                "updated_at": "2022-03-03T05:51:09.000000Z",
                "avatar": "https://via.placeholder.com/640x480.png/006633?text=avatar+in",
                "status": 1,
                "pivot": {
                  "team_id": 145,
                  "user_id": 45
                }
              }
            ]
          },
          {
            "id": 165,
            "name": "Miss Janae Lowe MD",
            "image": "https://i.pinimg.com/originals/6a/54/2a/6a542ae20b05d5129568fd49e03adb16.jpg",
            "contest_id": 2,
            "created_at": "2022-04-01T06:50:09.000000Z",
            "updated_at": "2022-04-01T06:50:09.000000Z",
            "members": []
          },
          {
            "id": 179,
            "name": "Brendan Reichert Jr.",
            "image": "https://i.pinimg.com/originals/6a/54/2a/6a542ae20b05d5129568fd49e03adb16.jpg",
            "contest_id": 2,
            "created_at": "2022-04-01T07:46:28.000000Z",
            "updated_at": "2022-04-01T07:46:28.000000Z",
            "members": []
          }
        ]
      },
      "type_exam": {
        "id": 7,
        "name": "Claude Howell",
        "created_at": "2022-03-02T04:30:28.000000Z",
        "updated_at": "2022-03-02T04:30:28.000000Z"
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
