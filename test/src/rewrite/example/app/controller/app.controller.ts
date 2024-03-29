import { AppService } from "_n2/service/app.service";
import { ShoeService } from "_n2/service/store/shoe.service";

export class AppController {
  constructor(private service: AppService, private shoeService: ShoeService) {}

  initial() {
    this.shoeService.order(4);
  }
}
