import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { MtlPurOrdeD } from './mtl-pur-orde-d';
import { MtlPurOrdeDetailPk } from './mtl-pur-orde-d-pk';
import { MtlPurOrdeM } from './mtl-pur-orde-m';
import { Pur0310mService } from './pur0310m.service';
import { MtlPurOrdeMasterPk } from './mtl-pur-orde-m-pk';

@Component({
  selector: 'app-pur0310m',
  templateUrl: './pur0310m.component.html',
  styleUrls: ['./pur0310m.component.scss']
})
export class Pur0310mComponent implements OnInit {
  @Output() purOrdeMaterBody = new EventEmitter<any>()
  @Output() purOrdeDetailBody = new EventEmitter<any>()

  title = '訂購單資料輸入(PUR0310M)';
  idList: string[] = [];
  rowIndex = -1;
  hasData: boolean = false;
  mtlPurOrdeM: MtlPurOrdeM;
  mtlPurOrdeDList: MtlPurOrdeD[] = [];
  mtlPurOrdeD: MtlPurOrdeD;
  mtlPurOrdeMasterPkList: MtlPurOrdeMasterPk[] = [];
  mtlPurOrdeDetailPkList: MtlPurOrdeDetailPk[] = [];

  @Output() outPutDetail = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private pru0310mSvc: Pur0310mService) { }

  ngOnInit(): void {
    if (!this.authService.authModel?.isAuth) {
      this.router.navigateByUrl('/login');
    }
  }

  onInsert() {
    console.log("not support yet!");
  }

  onUpdate() {
    console.log("not support yet!");
  }

  onDelete() {
    console.log("not support yet!");
  }

  async onQuery() {
    await this.pru0310mSvc.findAllMater()
      .subscribe(resp => {
        this.idList = resp.data;
        this.mtlPurOrdeMasterPkList = resp.data;
        this.rowIndex = 0;
        this.hasData = this.idList.length > 0;
        this.fetchOrder(this.idList[this.rowIndex]);
      });

    // this.pru0310mSvc.findAllDetail("PY14120001")
    //   .subscribe(resp => {
    //     this.mtlPurOrdeDetailPkList = resp.data;
    //     // this.outPutDetail.emit(this.x);
    //   });
    //   console.log(this.mtlPurOrdeDetailPkList.length);
    this.fetchOrderDetail("PY14120001");
    this.outPutDetail.emit(this.mtlPurOrdeDList);
  }

  onFindWindow() {
    console.log("not support yet!");
  }

  onNext() {
    console.log("not support yet!");
  }

  onPrev() {
    console.log("not support yet!");
  }

  onClearForm() {
    console.log("not support yet!");
  }

  fetchOrder(poNo: string) {
    this.pru0310mSvc.findByIdMaster(poNo)
      .subscribe(resp => {
        this.mtlPurOrdeM = resp.data;
      });
  }

  fetchOrderDetail(poNo: string) {
      this.pru0310mSvc.findOrderDetail(poNo)
        .subscribe(resp => {
          //  this.mtlPurOrdeD = resp.data;
           console.log(resp.data[0]);
          this.mtlPurOrdeDList = resp.data;
          
        });
    
  }
  // fetchOrderDetail(mtlPurOrdeDetailPk: MtlPurOrdeDetailPk[]) {
  //   mtlPurOrdeDetailPk.forEach(detailPk => {
  //     this.pru0310mSvc.findByIdDetail(detailPk.poNo, detailPk.itemNo)
  //       .subscribe(resp => {
  //         this.mtlPurOrdeD = resp.data;

  //         this.mtlPurOrdeDList.push(this.mtlPurOrdeD)
  //       });
  //   })
  // }
}
