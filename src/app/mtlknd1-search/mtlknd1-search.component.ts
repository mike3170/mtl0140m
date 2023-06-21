import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { FormUtils } from 'src/app/utils/formUtils';
import { MtlKnd1Search } from './mtlknd1-search.model';
import { MtlKnd1SearchService } from './mtlknd1-search.service';

@Component({
	selector: 'app-mtlKnd1-search',
	templateUrl: './mtlKnd1-search.component.html',
	styleUrls: ['./mtlKnd1-search.component.scss'],
	providers: [MtlKnd1SearchService]
})
export class MtlKnd1SearchComponent implements OnInit {
	formDeptSearch: UntypedFormGroup;
	mtlKnd1List: MtlKnd1Search[] = [];

	private _mesg: string;

	constructor(
		private mtlKnd1SearchService: MtlKnd1SearchService,
		private dialogRef: MatDialogRef<MtlKnd1SearchComponent>,
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

		if (this.mtlKnd1List && this.mtlKnd1List.length === 0) {
			this._mesg = "查無資料";
		}

		return this._mesg;

	}

	async search() {
		this.mtlKnd1SearchService.findAll()
			.subscribe(resp => {
				this.mtlKnd1List = resp.data;
			})
	}


	select(mtlKnd1: MtlKnd1Search) {
		this.dialogRef.close(mtlKnd1);
	}

}
