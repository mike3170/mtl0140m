import { AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormControlStatus, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, lastValueFrom, map, Subscription, switchMap, tap } from 'rxjs';
import { CodMastSearchComponent } from '../codMast-search/codMast-search.component';
import { AuthService } from '../core/auth/auth.service';
import { SimpleCrudBase } from '../core/crud/simplecrudbase';
import { Constants } from '../core/etc/constants/constants';
import { Api, ApiStatus, isHttpOK } from '../core/etc/models/api.model';
import { ProgFormStatus } from '../core/services/progFormStatus.service';
import { MtlKnd1SearchComponent } from '../mtlknd1-search/mtlknd1-search.component';
import { MtlKnd2SearchComponent } from '../mtlknd2-search/mtlknd2-search.component';
import { DialogService } from '../shared/dialogs/dialog.service';
import { StrUtils } from '../utils/strUtils';
import { MyValidators } from '../validator/my-validators';
import { MtlMastQueryComponent } from './mtlmast-query/mtlmast-query.component';
import { MtlMast } from './mtlmast.model';
import { MtlMastService } from './mtlmast.service';

interface KndName {
	knd1Name: string;
	knd1StopYn: string;
	knd2Name: string;
	knd2StopYn: string;
};

@Component({
	selector: 'app-mtlmast',
	templateUrl: './mtlmast.component.html',
	styleUrls: ['./mtlmast.component.scss']
})
export class MtlmastComponent extends SimpleCrudBase implements OnInit, OnDestroy, AfterViewInit, DoCheck {
	@ViewChild("mike") mike: MatButton;

	title = '物料基本建檔(MTL0140M)';
	idList: string[] = [];
	rowIndex = -1;
	form1!: UntypedFormGroup;
	// mtlMast = new MtlMast();
	knd1Name: KndName;
	knd2Name: KndName;

	mtlGradeList = ['A', 'B', 'C'];
	hasData: boolean = false;

	subs: Subscription[] = [];


	constructor(
		private mtlMastService: MtlMastService,
		private dialogService: DialogService,
		private authService: AuthService,
		private fb: UntypedFormBuilder,
		private router: Router,
		private progFormStatus: ProgFormStatus) {
		super();
		this.buildForm();

	}
	ngDoCheck(): void {
		// if (this.idList.length > 0) {
		// 	this.isDisable = false;
		// } else {
		// 	this.isDisable = true;
		// }
	}

	ngAfterViewInit(): void {
		const mike = this.mike;
		console.log(mike);


		// fromEvent(mike, 'click')
		// 	.subscribe(x => {
		// 		console.log('hello');

		// 	})
	}

	ngOnInit(): void {
		if (!this.authService.authModel?.isAuth) {
			this.router.navigateByUrl('/login');
		}
	}

	ngOnDestroy(): void {
		this.progFormStatus.setProgFormStatus(Constants.FORM_CLEANE);
		this.subs.forEach(sub => sub.unsubscribe());
	}


	buildForm() {
		this.form1 = this.fb.group({
			"mtlNo1": ["", Validators.required],
			"mtlKnd1Name": [""],
			"mtlNo2": ["", Validators.required],
			"mtlKnd2Name": [""],
			"mtlNo3": ["", Validators.required],
			"mtlNo": ["", Validators.required],
			"mtlName": ["", [Validators.required]],
			"mtlSpec": ["", [Validators.required]],
			"mtlGrade": [""],
			"leastBuy": ["", [MyValidators.negativeChk]],
			"stdUsedQty": ["", [MyValidators.negativeChk]],
			"leadTime": ["", [MyValidators.negativeChk]],
			"stopYn": ["", [Validators.required, Validators.pattern('[YN]')]],
			"purUnit": ["", Validators.required],
			"saveQty": ["", [MyValidators.negativeChk]],
			"reqCycle": ["", [MyValidators.negativeChk]],
			"stopDate": [""],
			"stkQty": [""],
			"stkUnit": ["", Validators.required],
			"inAllow": ["", Validators.max(50)],
			"location": [""],
			"stopEmp": [""],
			"tranRate": ["", [MyValidators.negativeChk]],
			"material": [""],
			"verNo": [""],
			"grapNo": [""],
			"firstInDate": [""],
			"lastInDate": [""],
			"lastIssuDate": [""],
		}, { updateOn: "blur" });

		this.form1.valueChanges
			.subscribe(v => {
				if (this.form1.dirty) {
					this.progFormStatus.setProgFormStatus(Constants.FROM_DIRTY);
				}
			});

		let sub = this.mtlNo1Ctrl.valueChanges
			.subscribe(v => {
				this.form1.controls['mtlNo'].setValue(v + this.form1.controls['mtlNo2'].value + this.form1.controls['mtlNo3'].value)
			});

		this.subs.push(sub);

		sub = this.mtlNo2Ctrl.valueChanges
			.subscribe(v => {
				this.form1.controls['mtlNo'].setValue(this.form1.controls['mtlNo1'].value + v + this.form1.controls['mtlNo3'].value)
			});

		this.subs.push(sub);

		sub = this.mtlNo3Ctrl.valueChanges
			.subscribe(v => {
				this.form1.controls['mtlNo'].setValue(this.form1.controls['mtlNo1'].value + this.form1.controls['mtlNo2'].value + v)
			});

		this.subs.push(sub);
		// ----------------------------------
		// sub = this.mtlNo1Ctrl.valueChanges
		// 	.pipe(
		// 		filter(mtlNo1 => !StrUtils.isEmpty(mtlNo1)),
		// 		debounceTime(1200),
		// 		distinctUntilChanged(),
		// 		switchMap(mtlNo1 => this.mtlMastService.findMtlNo1ByID(mtlNo1)),
		// 		map(resp => resp.data?.knd1Name)
		// 	)
		// 	.subscribe(knd1Name => {
		// 		if (knd1Name) {
		// 			this.form1.controls['mtlKnd1Name'].setValue(knd1Name);
		// 		} else {
		// 			this.dialogService.error('查無此物料大類代號\n' +
		// 				'物料大類:' + this.mtlNo1Ctrl.value)
		// 			this.mtlNo1Ctrl.setErrors({ err: "NOTFOUND" });
		// 			this.form1.controls['mtlKnd1Name'].reset();
		// 		}
		// 	}
		// 	);
		sub = this.mtlNo1Ctrl.valueChanges
			.pipe(filter(mtlNo1 => !StrUtils.isEmpty(mtlNo1)))
			.subscribe(mtlNo1 => {
				this.mtlMastService.findMtlNo1ByID(mtlNo1)
					.pipe(map(resp => resp.data?.knd1Name))
					.subscribe(knd1Name => {
						if (knd1Name) {
							this.form1.controls['mtlKnd1Name'].setValue(knd1Name);
						} else {
							this.dialogService.error('查無此物料大類代號\n' +
								'物料大類:' + mtlNo1)
							this.mtlNo1Ctrl.setErrors({ err: "NOTFOUND" });
							this.form1.controls['mtlKnd1Name'].markAsPristine();
						}
					});


			});

		this.subs.push(sub);

		sub = this.mtlNo2Ctrl.valueChanges
			.pipe(filter(mtlNo2 => !StrUtils.isEmpty(mtlNo2)))
			.subscribe(mtlNo2 => {
				this.mtlMastService.findMtlNo2ByID(this.mtlNo1Ctrl.value, mtlNo2)
					.subscribe(resp => {
						if (!resp.data) {
							this.dialogService.error('查無此物料大類及中類代號\n' +
								'物料大類:' + this.mtlNo1Ctrl.value + '\n' +
								'物料中類:' + mtlNo2 + '\n')
							this.mtlNo2Ctrl.setErrors({ err: "NOTFOUND" });
							this.form1.controls['mtlKnd2Name'].setValue(null);
						} else {
							this.knd2Name = resp.data;
							this.form1.controls['mtlKnd2Name'].setValue(resp.data.knd2Name);
						}
					});

			});

		this.subs.push(sub);

		sub = this.mtlGradeCtrl.valueChanges
			.subscribe(mtlGrade => {
				if (mtlGrade != 'A' && mtlGrade != 'B' && mtlGrade != 'C' && mtlGrade) {
					this.mtlGradeCtrl.setErrors({ err: "XXX" });
					this.dialogService.error("物料等級只允許輸入A,B或C");

				}

			});

		this.subs.push(sub);

		sub = this.leastBuyCtrl.valueChanges
			.subscribe(leastBuy => {
				let mesg = "";
				if (this.leastBuyCtrl.errors) {
					Object.values(this.leastBuyCtrl.errors)
						.forEach(errmesg => { mesg = mesg + errmesg + "\n" })
					this.dialogService.error(mesg);
				}
			});

		this.subs.push(sub);

		sub = this.stdUsedQtyCtrl.valueChanges
			.subscribe(stdUsedQty => {
				let mesg = "";
				if (this.stdUsedQtyCtrl.errors) {
					Object.values(this.stdUsedQtyCtrl.errors)
						.forEach(errmesg => { mesg = mesg + errmesg + "\n" })
					this.dialogService.error(mesg);
				}
			});

		this.subs.push(sub);

		sub = this.leadTimeCtrl.valueChanges
			.subscribe(leadTime => {
				let mesg = "";
				if (this.leadTimeCtrl.errors) {
					Object.values(this.leadTimeCtrl.errors)
						.forEach(errmesg => { mesg = mesg + errmesg + "\n" })
					this.dialogService.error(mesg);
				}
			});

		this.subs.push(sub);

		sub = this.tranRateCtrl.valueChanges
			// .pipe(filter((s: FormControlStatus) => s === "INVALID"))
			.subscribe(tranRate => {
				let mesg = "";
				if (this.tranRateCtrl.errors) {
					Object.values(this.tranRateCtrl.errors)
						.forEach(errmesg => { mesg = mesg + errmesg + "\n" })
					this.dialogService.error(mesg);
				}
			});

		this.subs.push(sub);

		sub = this.stopYnCtrl.valueChanges
			.pipe(filter(stopYn => !StrUtils.isEmpty(stopYn)))
			.subscribe(stopYn => {
				if (!stopYn.match(/[YN]/)) {
					this.stopYnCtrl.setErrors({ err: "XXX" });
					this.dialogService.error("停用否只允許輸入Y或N");
					return;
				};

				if (StrUtils.isEmpty(stopYn) || stopYn === 'N') {
					this.stopDateCtrl.markAsPristine();
					this.stopEmpCtrl.markAsPristine();
				} else if (stopYn === 'Y') {
					this.stopDateCtrl.setValue(new Date());
					this.stopEmpCtrl.setValue('MIKE');
				}
			});

		this.subs.push(sub);

		// this.purUnitCtrl.valueChanges
		// 	.pipe(
		// 		filter(x => !StrUtils.isEmpty(x)),
		// 		switchMap(x => this.mtlMastService.unitIsExist(x))
		// 	)
		// 	.subscribe(resp => {
		// 		if (!resp.data) {
		// 			this.purUnitCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND });
		// 			this.dialogService.error('查無此採購單位代號\n' +
		// 				'採購單位代號:' + this.purUnitCtrl.value);
		// 		}

		// 	});



		// this.stopEmpCtrl.disable();

		// this.stopDateCtrl.disable();

		sub = this.purUnitCtrl.valueChanges
			.pipe(
				filter(purUnit => !StrUtils.isEmpty(purUnit))
			)
			.subscribe(resp => {
				this.mtlMastService.unitIsExist(this.purUnitCtrl.value)
					.subscribe(resp => {
						if (StrUtils.isEmpty(resp.data)) {
							this.purUnitCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND });
							this.dialogService.error('查無此採購單位代號\n' +
								'採購單位代號:' + this.purUnitCtrl.value);
						}
					});
			});

		this.subs.push(sub);

		this.stkUnitCtrl.valueChanges
			.subscribe(stkUnit => {
				if (stkUnit) {
					this.mtlMastService.unitIsExist(this.stkUnitCtrl.value)
						.subscribe(v => {
							if (!v.data) {
								console.log(v.data);

								this.stkUnitCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND });
								this.dialogService.error('查無此庫存單位代號\n' +
									'庫存單位代號:' + this.stkUnitCtrl.value);
							}
						});
				};

			});

		this.subs.push(sub);

		sub = this.inAllowCtrl.valueChanges
			.subscribe(inAllow => {
				if (inAllow > 100) {
					this.dialogService.error('允收百分比不可大於100');
					this.inAllowCtrl.setErrors({ err: 'inValid' });
				}
			});

		this.subs.push(sub);
	};
	get mtlNo1Ctrl() {
		return this.form1.controls['mtlNo1'];
	}

	get mtlNo2Ctrl() {
		return this.form1.controls['mtlNo2'];
	}

	get mtlNo3Ctrl() {
		return this.form1.controls['mtlNo3'];
	}

	get mtlNoCtrl() {
		return this.form1.controls['mtlNo'];
	}

	get tranRateCtrl() {
		return this.form1.controls['tranRate'];
	}

	get leadTimeCtrl() {
		return this.form1.controls['leadTime'];
	}

	get stdUsedQtyCtrl() {
		return this.form1.controls['stdUsedQty'];
	}

	get leastBuyCtrl() {
		return this.form1.controls['leastBuy'];
	}

	get mtlGradeCtrl() {
		return this.form1.controls['mtlGrade'];
	}

	get stopYnCtrl() {
		return this.form1.controls['stopYn'];
	}

	get stopDateCtrl() {
		return this.form1.controls['stopDate'];
	}

	get stopEmpCtrl() {
		return this.form1.controls['stopEmp'];
	}

	get purUnitCtrl() {
		return this.form1.controls['purUnit'];
	}

	get stkUnitCtrl() {
		return this.form1.controls['stkUnit'];
	}

	get inAllowCtrl() {
		return this.form1.controls['inAllow'];
	}

	// 重後端讀取 
	fetch(mtlNo: string) {
		this.mtlMastService.findById(mtlNo)
			.subscribe(resp => {
				this.mtlMast = resp.data;
				this.form1.reset(this.mtlMast);
			});
	}

	// 新增
	onInsert() {
		if (this.form1.invalid) {
			this.dialogService.error(Constants.FORM_INVALID);
			return;
		}
		//  this.form1.controls['mtlNo'].setValue(this.form1.controls['mtlNo1'].value + this.form1.controls['mtlNo2'].value + this.form1.controls['mtlNo3'].value);

		const mtlMast: MtlMast = { ...this.form1.value };
		mtlMast.mtlNo = mtlMast.mtlNo1 + mtlMast.mtlNo2 + mtlMast.mtlNo3;
		this.mtlMastService.insert(mtlMast)
			.subscribe(resp => {
				if (resp.status === ApiStatus.OK) {
					this.idList = [];
					this.rowIndex = -1;
					//this.setButtonStatus();
					this.dialogService.snack(Constants.INSERT_OK);
				} else {
					this.dialogService.error(resp.error.desc);
					return;
				}
			}
			)

	}

	// 修改
	async onUpdate() {
		if (this.form1.invalid) {
			this.dialogService.error(Constants.FORM_INVALID);
			return;
		}

		if (this.form1.pristine) {
			this.dialogService.info(Constants.DATA_NO_CHANGE);
			return;
		}

		if (this.mtlMast.mtlNo !== this.mtlNoCtrl.value) {
			await this.dialogService.error(Constants.PK_CAN_NOT_CHANGE).afterClosed().toPromise();
			this.fetch(this.idList[this.rowIndex]);
			return;
		}
		// master
		if (this.form1.dirty) {
			console.log("master dirty");

			const mtlMast: MtlMast = { ...this.mtlMast, ...this.form1.value };
			// const mtlMast: MtlMast = { ...this.mtlMast, ...this.form1.getRawValue() };
			const resp = await lastValueFrom<Api>(this.mtlMastService.update(mtlMast));
			if (resp.status === ApiStatus.OK) {
				this.mtlMast = resp.data;
				this.form1.reset(this.mtlMast);
				this.dialogService.snack(Constants.UPDATE_OK);
			} else {
				this.dialogService.error(resp.error.desc);
				return;
			}
		}

	}

	// 刪除
	async onDelete() {
		const mtlNo = this.mtlNoCtrl.value;
		if (StrUtils.isEmpty(mtlNo)) {
			this.dialogService.error(Constants.QUERY_FIRST);
			return;
		}

		let resp = await lastValueFrom(this.dialogService.deleteConfirm().afterClosed());
		if (!resp || resp === "N") {
			this.dialogService.snack(Constants.CACEL_DELETE);
			return;
		}

		this.mtlMastService.delete(mtlNo)
			.subscribe(resp => {
				if (resp.status === ApiStatus.OK) {
					this.idList = this.idList.filter(id => id !== mtlNo);
					// this.rowIndex = -1;
					//this.setButtonStatus();

					// this.form1.reset();
					// this.mtlMast = null; mike
					// this.mtlMast = new MtlMast();
					if (this.idList.length > 0) {
						this.fetch(this.idList[this.rowIndex]);
					} else {
						this.rowIndex = -1;
						this.form1.markAsPristine();
						this.mtlMast = new MtlMast();
					}
					const msg = mtlNo + " " + Constants.DELETE_OK;
					this.dialogService.snack(msg);

				} else {
					const msg = mtlNo + " " + Constants.DELETE_FAIL + "\n" + resp.error.desc;
					this.dialogService.error(msg);
				}

			});
	}

	onQuery() {
		this.mtlMastService.findAll()
			.subscribe(resp => {
				this.idList = resp.data;
				this.rowIndex = 0;
				this.hasData = this.idList.length > 0;
				this.fetch(this.idList[this.rowIndex]);
			});
	}

	// 查詢視窗
	async onFindWindow() {
		const dialogRef = this.dialogService.open(MtlMastQueryComponent,
			{ disableClose: true, position: { top: "10px" } });

		const matrix = await lastValueFrom(dialogRef.afterClosed());
		console.log(matrix);

		if (!matrix) return;

		this.mtlMastService.query(matrix)
			.subscribe(resp => {
				this.idList = resp.data;
				//this.idList = this.empList.map(emp => emp.empId);

				//this.setButtonStatus();

				if (this.idList.length == 0) {
					this.dialogService.info(Constants.QUERY_NOT_FOUND);
					this.form1.markAsPristine();
					this.rowIndex = -1;
					this.idList = [];
					this.hasData = false;
					return;
				}

				if (this.idList.length > 0) {
					this.rowIndex = 0;
					this.hasData = true;
					this.fetch(this.idList[this.rowIndex]);
				}

			});
	}

	// 清除畫面
	onClearForm() {
		this.form1.reset();
		this.idList = [];
		this.rowIndex = -1;	
		this.hasData = false;	
	}

	async onPrev() {
		if (this.form1.dirty) {
			const result = await lastValueFrom(this.dialogService.dirtyConfirm().afterClosed());
			if (result === false) {
				return;
			}
		}

		this.rowIndex--;
		this.rowIndex = Math.max(0, this.rowIndex);
		this.fetch(this.idList[this.rowIndex]);
	}

	async onNext() {
		if (this.form1.dirty) {
			const result = await lastValueFrom(this.dialogService.dirtyConfirm().afterClosed());
			if (result === false) {
				return;
			}
		}

		this.rowIndex++;
		this.rowIndex = Math.min(this.rowIndex, this.idList.length - 1);
		this.fetch(this.idList[this.rowIndex]);
	}

	searchMtlKnd1() {
		const conf: MatDialogConfig = {
			minHeight: "390px"
		};

		const dialogRef = this.dialogService.open(MtlKnd1SearchComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(mtlKnd1 => mtlKnd1 ? true : false))
			.subscribe(mtlKnd1 => {
				console.log(mtlKnd1?.mtlNo1);
				// this.form1.patchValue(codMast, { emitEvent: false });
				this.form1.get('mtlNo1')?.setValue(mtlKnd1.mtlNo1);
				this.form1.get('mtlNo1')?.markAsDirty();

				// this.form1.controls[field].setValue(codMast.codeNo);
				// this.form1.controls[field].markAsDirty();



			});
	}

	searchMtlKnd2() {
		if (StrUtils.isEmpty(this.mtlNo1Ctrl.value)) {
			this.dialogService.error('請先輸入物料大類\n' +
				'再點選此案紐');
			return;
		}
		const conf: MatDialogConfig = {
			minHeight: "390px",
			data: {
				mtlNo1: this.mtlNo1Ctrl.value
			}
		};

		const dialogRef = this.dialogService.open(MtlKnd2SearchComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(mtlKnd2 => mtlKnd2 ? true : false))
			.subscribe(mtlKnd2 => {
				// this.form1.patchValue(codMast, { emitEvent: false });
				this.form1.get('mtlNo2')?.setValue(mtlKnd2.mtlNo2);
				this.form1.get('mtlNo2')?.markAsDirty();

				// this.form1.controls[field].setValue(codMast.codeNo);
				// this.form1.controls[field].markAsDirty();



			});
	}

	searchCodMast(kind: string, field: 'purUnit' | 'stkUnit') {
		const conf: MatDialogConfig = {
			minHeight: "390px",
			data: { kind }
		};

		const dialogRef = this.dialogService.open(CodMastSearchComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(codMast => codMast ? true : false))
			.subscribe(codMast => {
				console.log(codMast?.codeNo);
				// this.form1.patchValue(codMast, { emitEvent: false });

				this.form1.get(field)?.setValue(codMast.codeNo);
				this.form1.get(field)?.markAsDirty();

				// if (field === 'purUnit') {
				// 	this.purUnitCtrl.setValue(codMast.codeNo);
				// 	this.purUnitCtrl.markAsDirty();
				// } else if (field === 'stkUnit'){
				// 	this.stkUnitCtrl.setValue(codMast.codeNo);
				// 	this.stkUnitCtrl.markAsDirty();
				// }
				// this.form1.controls[field].setValue(codMast.codeNo);
				// this.form1.controls[field].markAsDirty();



			});
	}

}
