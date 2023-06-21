import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { filter, lastValueFrom } from 'rxjs';
import { BasCstMastSearchComponent } from '../basCstMast-search/basCstMast-search.component';
import { CodMastSearchComponent } from '../codMast-search/codMast-search.component';
import { Constants } from '../core/etc/constants/constants';
import { Api, ApiStatus } from '../core/etc/models/api.model';
import { ProgFormStatus } from '../core/services/progFormStatus.service';
import { DialogService } from '../shared/dialogs/dialog.service';
import { StrUtils } from '../utils/strUtils';
import { MyValidators } from '../validator/my-validators';
import { BasVenMast } from './basvenmast.model';
import { BasvenmastService } from './basvenmast.service';

@Component({
	selector: 'app-basvenmast',
	templateUrl: './basvenmast.component.html',
	styleUrls: ['./basvenmast.component.scss']
})
export class BasvenmastComponent implements OnInit {
	progTitle: string = '廠商基本建檔(BAS0250M)'
	form1!: UntypedFormGroup;
	basVenMast = new BasVenMast();
	idList: string[] = [];
	rowIndex = -1;


	constructor(private basVenMastService: BasvenmastService,
		private fb: UntypedFormBuilder,
		private dialogService: DialogService,
		private progFormStatus: ProgFormStatus) {
		this.buildForm();
	}

	ngOnInit(): void {
	}

	ngOndestroy(): void {
		this.progFormStatus.setProgFormStatus(Constants.FORM_CLEANE);
	}

	buildForm() {
		this.form1 = this.fb.group({
			"venNo": ["", Validators.required],
			"creaDate": ["", Validators.required],
			"venName": ["", Validators.required],
			"venAbbr": ["", Validators.required],
			"venNameE": ["", Validators.required],
			"mchNo": [""],
			"paymentTerm": [""],
			"payDays": [""],
			"invKind": [""],
			"taxId": [""],
			"stopYn": ["", Validators.required],
			"payKind": [""],
			"currNo": [""],
			"taxKind": [""],
			"billEnd": [""],
			"cstNo": [""],
			"wirLoss": [""],
			"makeAbility": [""],
			"quality": [""],
			"webSite": [""],
			"lowProcAmt": [""],
			"venAddr1": ["", Validators.required],
			"foreign": [""],
			"lossRate": [""],
			"lossType": [""],

			"payTermName": [""],
			"payKindName": [""],
			"invKindName": [""],
			"taxKindName": [""],
			"cstName": [""],
			"makeAbilityName": [""],
			"qualityName": [""],
		}, { updateOn: "blur" });

		this.form1.valueChanges
			.subscribe(v => {
				if(this.form1.dirty){
					this.progFormStatus.setProgFormStatus(Constants.FROM_DIRTY);
				}
			});

		this.paymentTermCtrl.valueChanges.
			pipe(filter(paymentTerm => !StrUtils.isEmpty(paymentTerm))).
			subscribe(paymentTerm => {
				if (paymentTerm) {
					this.basVenMastService.codIsExist('APTM', paymentTerm).
						subscribe(v => {
							if (!v.data) {
								this.paymentTermCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND });
								this.dialogService.error('查無此付款條件 \n' +
									'付款條件:' + this.paymentTermCtrl.value);
							} else {
								this.basVenMastService.getCodeName('APTM', this.paymentTermCtrl.value).
									subscribe(v => {
										this.payTermNameCtrl.setValue(v.data);
									})
							}
						})
				}
			});

		this.payKindCtrl.valueChanges.
			pipe(filter(payKind => !StrUtils.isEmpty(payKind))).
			subscribe(payKind => {
				this.basVenMastService.codIsExist('ACPK', payKind).
					subscribe(v => {
						if (!v.data) {
							this.payKindCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND })
							this.dialogService.error('查無此付款方式 \n' +
								'付款方式:' + this.payKindCtrl.value);
						} else {
							this.basVenMastService.getCodeName('ACPK', this.payKindCtrl.value).
								subscribe(v => {
									this.payKindNameCtrl.setValue(v.data);
								})
						}
					})
			});

		this.currNoCtrl.valueChanges.
			pipe(filter(currNo => !StrUtils.isEmpty(currNo))).
			subscribe(currNo => {
				this.basVenMastService.codIsExist('CURR', currNo).
					subscribe(v => {
						if (!v.data) {
							this.currNoCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND })
							this.dialogService.error('查無此幣別 \n' +
								'幣別:' + this.currNoCtrl.value);
						}
					})
			})

		this.invKindCtrl.valueChanges.
			pipe(filter(invKind => !StrUtils.isEmpty(invKind))).
			subscribe(invKind => {
				if (invKind) {
					this.basVenMastService.codIsExist('AINV', invKind).
						subscribe(v => {
							if (!v.data) {
								this.invKindCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND })
								this.dialogService.error('查無此發票別 \n' +
									'發票別:' + this.invKindCtrl.value);
							} else {
								this.basVenMastService.getCodeName('AINV', this.invKindCtrl.value).
									subscribe(v => {
										this.invKindNameCtrl.setValue(v.data);
									})
							}
						})
				}
			});

		this.taxKindCtrl.valueChanges.
			pipe(filter(taxKind => !StrUtils.isEmpty(taxKind))).
			subscribe(taxKind => {
				if (taxKind) {
					this.basVenMastService.codIsExist('ATAX', taxKind).
						subscribe(v => {
							if (!v.data) {
								this.taxKindCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND })
								this.dialogService.error('查無此稅率別 \n' +
									'稅率別:' + this.taxKindCtrl.value);
							} else {
								this.basVenMastService.getCodeName('ATAX', this.taxKindCtrl.value).
									subscribe(v => {
										this.taxKindNameCtrl.setValue(v.data);
									})
							}
						})
				}
			});
		this.cstNoCtrl.valueChanges.
			pipe(filter(cstNo => !StrUtils.isEmpty(cstNo))).
			subscribe(cstNo => {
				this.basVenMastService.getCstAbbr(cstNo).
					subscribe(v => {
						console.log(/@/.test('mikewstaninfo.com'));
						if (v.status === ApiStatus.OK) {
							this.cstNameCtrl.setValue(v.data.cstAbbr);
						} else {
							this.dialogService.error('查無此客戶代號\n' +
								'客戶代號:' + cstNo)
							this.cstNoCtrl.setErrors({ err: Constants.QUERY_NOT_FOUND });
						}
					})
			})

		this.webSiteCtrl.valueChanges.
			pipe(filter(website => !StrUtils.isEmpty(website))).
			subscribe(webSite => {
				if (!/.com/.test(webSite)) {
					this.dialogService.error('輸入網址格式不符合規範 \n' +
						'網站:' + webSite);
					this.webSiteCtrl.setErrors({ err: 'Formate not match' })
				}
			})
	}

	get venNoCtrl() {
		return this.form1.controls['venNo'];
	}

	get paymentTermCtrl() {
		return this.form1.controls['paymentTerm'];
	}

	get payTermNameCtrl() {
		return this.form1.controls['payTermName'];
	}

	get payKindCtrl() {
		return this.form1.controls['payKind'];
	}

	get payKindNameCtrl() {
		return this.form1.controls['payKindName'];
	}

	get currNoCtrl() {
		return this.form1.controls['currNo'];
	}

	get invKindCtrl() {
		return this.form1.controls['invKind'];
	}

	get invKindNameCtrl() {
		return this.form1.controls['invKindName'];
	}

	get taxKindCtrl() {
		return this.form1.controls['taxKind'];
	}

	get taxKindNameCtrl() {
		return this.form1.controls['taxKindName'];
	}

	get foreignCtrl() {
		return this.form1.controls['foreign'];
	}

	get lossRateCtrl() {
		return this.form1.controls['lossRate'];
	}

	get lossTypeCtrl() {
		return this.form1.controls['lossType'];
	}

	get cstNoCtrl() {
		return this.form1.controls['cstNo'];
	}

	get cstNameCtrl() {
		return this.form1.controls['cstName'];
	}

	get webSiteCtrl() {
		return this.form1.controls['webSite'];
	}

	// 新增
	onInsert() {
		if (this.form1.invalid) {
			this.dialogService.error(Constants.FORM_INVALID);
			return;
		}
		//  this.form1.controls['mtlNo'].setValue(this.form1.controls['mtlNo1'].value + this.form1.controls['mtlNo2'].value + this.form1.controls['mtlNo3'].value);
		if (StrUtils.isEmpty(this.foreignCtrl.value)) {
			this.foreignCtrl.setValue('N');
		}

		if (StrUtils.isEmpty(this.lossRateCtrl.value)) {
			this.lossRateCtrl.setValue(0);
		}

		this.lossTypeCtrl.setValue('0');
		const basVenMast: BasVenMast = { ...this.form1.value };

		this.basVenMastService.insert(basVenMast)
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

		//if (this.form1.pristine) {
		//	this.dialogService.info(Constants.DATA_NO_CHANGE);
		//	return;
		//}

		if (this.basVenMast.venNo !== this.venNoCtrl.value) {
			await this.dialogService.error(Constants.PK_CAN_NOT_CHANGE).afterClosed().toPromise();
			this.fetch(this.idList[this.rowIndex]);
			return;
		}

		// master
		if (this.form1.dirty) {
			console.log("master dirty");

			const basVenMast: BasVenMast = { ...this.basVenMast, ...this.form1.value };
			// const mtlMast: MtlMast = { ...this.mtlMast, ...this.form1.getRawValue() };
			const resp = await lastValueFrom<Api>(this.basVenMastService.update(basVenMast));
			if (resp.status === ApiStatus.OK) {
				this.basVenMast = resp.data;
				this.form1.reset(this.basVenMast);
				this.dialogService.snack(Constants.UPDATE_OK);
			} else {
				this.dialogService.error(resp.error.desc);
				return;
			}
		}

	}

	// 刪除
	async onDelete() {
		const venNo = this.venNoCtrl.value;
		if (StrUtils.isEmpty(venNo)) {
			this.dialogService.error(Constants.QUERY_FIRST);
			return;
		}

		let resp = await lastValueFrom(this.dialogService.deleteConfirm().afterClosed());
		if (!resp || resp === "N") {
			this.dialogService.snack(Constants.CACEL_QUERY);
			return;
		}

		this.basVenMastService.delete(venNo)
			.subscribe(resp => {
				if (resp.status === ApiStatus.OK) {
					this.idList = [];
					this.rowIndex = -1;
					//this.setButtonStatus();

					this.form1.reset();
					// this.mtlMast = null; mike
					this.basVenMast = new BasVenMast();

					const msg = venNo + " " + Constants.DELETE_OK;
					this.dialogService.snack(msg);

				} else {
					const msg = venNo + " " + Constants.DELETE_FAIL + "\n" + resp.error.desc;
					this.dialogService.error(msg);
				}

			});
	}

	onQuery() {
		this.basVenMastService.findAll()
			.subscribe(resp => {
				this.idList = resp.data;
				this.rowIndex = 0;
				console.log(this.idList+' WWW');
				
				this.fetch(this.idList[this.rowIndex]);
			});
	}


	// 清除畫面
	onClearForm() {
		this.form1.reset();
		this.basVenMast = new BasVenMast();
		// this.mtlMast.mtlNo = null; mike
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

	// 重後端讀取 
	fetch(mtlNo: string) {
		this.basVenMastService.findById(mtlNo)
			.subscribe(resp => {
				this.basVenMast = resp.data;
				this.form1.reset(this.basVenMast);
			});
	}

	searchCodMast(kind: string, field: string) {
		const conf: MatDialogConfig = {
			minHeight: "390px",
			data: {
				kind: kind
			}
		};

		const dialogRef = this.dialogService.open(CodMastSearchComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(codMast => codMast ? true : false))
			.subscribe(codMast => {
				console.log(codMast?.codeNo);
				// this.form1.patchValue(codMast, { emitEvent: false });
				this.form1.get(field)?.setValue(codMast.codeNo);
				this.form1.get(field)?.markAsDirty();

				// this.form1.controls[field].setValue(codMast.codeNo);
				// this.form1.controls[field].markAsDirty();



			});
	}

	searchCstMast() {
		const conf: MatDialogConfig = {
			minHeight: "390px"
		};

		const dialogRef = this.dialogService.open(BasCstMastSearchComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(cst => cst ? true : false))
			.subscribe(cst => {
				this.form1.get('cstNo')?.setValue(cst.cstNo);
				this.form1.get('cstNo')?.markAsDirty();
			});
	}
}
