import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { FormUtils } from 'src/app/utils/formUtils';
import { MtlKnd2Search } from './mtlknd2-search.model';
import { MtlKnd2SearchService } from './mtlknd2-search.service';

interface inputData {
	mtlNo1: string;
}

@Component({
	selector: 'app-mtlKnd2-search',
	templateUrl: './mtlKnd2-search.component.html',
	styleUrls: ['./mtlKnd2-search.component.scss'],
	providers: [MtlKnd2SearchService]
})

export class MtlKnd2SearchComponent implements OnInit {
	formDeptSearch: UntypedFormGroup;
	mtlKnd2List: MtlKnd2Search[] = [];

	private _mesg: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: inputData,
		private mtlKnd2SearchService: MtlKnd2SearchService,
		private dialogRef: MatDialogRef<MtlKnd2SearchComponent>,
		private fb: UntypedFormBuilder,
		private dialogService: DialogService) {
		//-----
		this.formDeptSearch = this.fb.group({
			deptNo: [],
			deptName: [],
		});

	}

	ngOnInit(): void {
		this.search();
	}

	get mesg(): string {
		// if (!this.codMastist) {
		// 	this._mesg = "請輸入條件";
		// }

		if (this.mtlKnd2List && this.mtlKnd2List.length === 0) {
			this._mesg = "查無資料";
		}

		return this._mesg;

	}

	async search() {
		this.mtlKnd2SearchService.findByMtlNo1(this.data.mtlNo1)
			.subscribe(resp => {
				this.mtlKnd2List = resp.data;
			})
	}


	select(mtlKnd2: MtlKnd2Search) {
		this.dialogRef.close(mtlKnd2);
	}

}
