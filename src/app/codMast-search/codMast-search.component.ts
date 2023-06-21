import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { FormUtils } from 'src/app/utils/formUtils';
import { CodMastSearchService} from './codMast-search.service';
import { CodMast } from './codMast.model';

interface inputData {
	kind: string;
}

@Component({
	selector: 'app-codMast-search',
	templateUrl: './codMast-search.component.html',
	styleUrls: ['./codMast-search.component.scss'],
	providers: [CodMastSearchService]
})
export class CodMastSearchComponent implements OnInit {
	formDeptSearch: UntypedFormGroup;
	codMastList: CodMast[];

	private _mesg: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: inputData,
		private codMastSearchService: CodMastSearchService,
		private dialogRef: MatDialogRef<CodMastSearchComponent>,
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

		if (this.codMastList && this.codMastList.length === 0) {
			this._mesg = "查無資料";
		}

		return this._mesg;

	}

	async search() {
		this.codMastSearchService.findByKind(this.data.kind)
			.subscribe(resp => {
				this.codMastList = resp.data;
			})
	}


	select(codMast: CodMast) {
		this.dialogRef.close(codMast);
	}

}
